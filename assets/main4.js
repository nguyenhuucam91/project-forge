const SnapPointToolName = 'snap-tool'

class SnapPointTool extends Autodesk.Viewing.ToolInterface {
  constructor(viewer, ext) {
    super()
    this.ext = ext
    this.viewer = viewer
    this.names = [SnapPointToolName]
    this.active = false
    this.snapper = null
    this.point = null
    this.lastModule = null
    // Hack: delete functions defined on the *instance* of a ToolInterface (we want the tool controller to call our class methods instead)
    delete this.register
    delete this.deregister
    delete this.activate
    delete this.deactivate
    delete this.getPriority
    delete this.handleMouseMove
    delete this.handleSingleClick
    delete this.handleKeyUp
  }

  register() {
    this.snapper = new Autodesk.Viewing.Extensions.Snapping.Snapper(this.viewer, {
      renderSnappedGeometry: true,
      renderSnappedTopology: true
    })
    this.viewer.toolController.registerTool(this.snapper)
    this.viewer.toolController.activateTool(this.snapper.getName())
  }

  deregister() {
    this.viewer.toolController.deactivateTool(this.snapper.getName())
    this.viewer.toolController.deregisterTool(this.snapper)
    this.snapper = null
  }

  activate(name, viewer) {
    if (!this.active) {
      this.active = true
    }
  }

  deactivate(name) {
    if (this.active) {
      this.active = false
    }
  }

  getPriority() {
    return 42 // Feel free to use any number higher than 0 (which is the priority of all the default viewer tools)
  }

  handleMouseMove(event) {
    if (!this.active) {
      return false
    }

    this.snapper.indicator.clearOverlays()
    if (this.snapper.isSnapped()) {
      const result = this.snapper.getSnapResult()
      const { SnapType } = Autodesk.Viewing.MeasureCommon
      switch (result.geomType) {
        case SnapType.SNAP_VERTEX:
        case SnapType.SNAP_MIDPOINT:
        case SnapType.SNAP_INTERSECTION:
        case SnapType.SNAP_CIRCLE_CENTER:
        case SnapType.RASTER_PIXEL:
          this.snapper.indicator.render() // Show indicator when snapped to a vertex
          this.point = result.geomVertex.clone()
          break
        case SnapType.SNAP_EDGE:
        case SnapType.SNAP_CIRCULARARC:
        case SnapType.SNAP_CURVEDEDGE:
          break
        case SnapType.SNAP_FACE:
        case SnapType.SNAP_CURVEDFACE:
          break
      }
    }
    return false
  }

  handleSingleClick(event, button) {
    if (!this.active) {
      return false
    }

    if (button === 0 && this.snapper.isSnapped()) {
      const result = this.snapper.getSnapResult()
      const { SnapType } = Autodesk.Viewing.MeasureCommon
      switch (result.geomType) {
        case SnapType.SNAP_VERTEX:
        case SnapType.SNAP_MIDPOINT:
        case SnapType.SNAP_INTERSECTION:
        case SnapType.SNAP_CIRCLE_CENTER:
        case SnapType.RASTER_PIXEL:
          this.point = result.geomVertex
          this._update(result.geomVertex.clone())
          break
        case SnapType.SNAP_CURVEDEDGE:
        default:
          // Do not snap to other types
          break
      }
      return true // Stop the event from going to other tools in the stack
    }
    return false
  }

  handleKeyUp(event, keyCode) {
    if (this.active) {
      if (keyCode === 27) {
        const controller = this.viewer.toolController
        controller.deactivateTool(SnapPointToolName)
        this.snapper.indicator.clearOverlays()
        this.point = null
        this.lastModule = null
        return true
      }
    }
    return false
  }

  _update(intermediatePoint = null) {
    if (this.points.length + (intermediatePoint ? 1 : 0) > 2) {
      if (this.mesh) {
        this.viewer.overlays.removeMesh(this.mesh, DrawBoundsOverlayName)
      }
      let minZ = this.points[0].z,
        maxZ = this.points[0].z
      let shape = new THREE.Shape()
      shape.moveTo(this.points[0].x, this.points[0].y)
      for (let i = 1; i < this.points.length; i++) {
        shape.lineTo(this.points[i].x, this.points[i].y)
        minZ = Math.min(minZ, this.points[i].z)
        maxZ = Math.max(maxZ, this.points[i].z)
      }
      if (intermediatePoint) {
        shape.lineTo(intermediatePoint.x, intermediatePoint.y)
        minZ = Math.min(minZ, intermediatePoint.z)
        maxZ = Math.max(maxZ, intermediatePoint.z)
      }
      let geometry = new THREE.BufferGeometry().fromGeometry(
        new THREE.ExtrudeGeometry(shape, { steps: 1, amount: maxZ - minZ, bevelEnabled: false })
      )
      let material = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true })
      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.position.z = minZ
      this.viewer.overlays.addMesh(this.mesh, DrawBoundsOverlayName)
      this.viewer.impl.sceneUpdated(true)
    }
  }

  loadModel = (viewer, urn, opts) => {
    return new Promise(function (resolve, reject) {
      function onDocumentLoadSuccess(doc) {
        const viewables = doc.getRoot().search({ type: 'geometry', role: '3d' })
        viewables.forEach((element) => {
          viewer
            .loadDocumentNode(doc, element, opts)
            .then((model) => resolve(model))
            .catch((err) => reject(err))
        })
      }
      function onDocumentLoadFailure(code, message) {
        reject(message)
      }
      Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure)
    })
  }
}

class LoadModelToViewExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options)
    this.tool = new SnapPointTool(viewer, this)
    this.button = null
  }

  async load() {
    //Load extension snapping
    await this.viewer.loadExtension('Autodesk.Snapping')
    //đăng ký tool snapPointTool
    this.viewer.toolController.registerTool(this.tool)
    return true
  }

  async unload() {
    this.viewer.toolController.deregisterTool(this.tool)

    const controller = this.viewer.toolController
    // tắt tool snap point
    controller.deactivateTool(SnapPointToolName)
    this.tool.lastModule = null
    return true
  }

  onToolbarCreated(toolbar) {
    const controller = this.viewer.toolController
    this.button = new Autodesk.Viewing.UI.Button('load-model-to-view-button')

    this.button.onClick = (ev) => {
      // Load Tool snap point khi nó chưa active
      if (controller.isToolActivated(SnapPointToolName)) {
        controller.deactivateTool(SnapPointToolName)
        this.button.setState(Autodesk.Viewing.UI.Button.State.INACTIVE)
        this.tool.lastModule = null
      } else {
        controller.activateTool(SnapPointToolName)
        this.button.setState(Autodesk.Viewing.UI.Button.State.ACTIVE)
        this.tool.lastModule = null
      }
    }

    this.button.setToolTip('Load model to view')
    this.group = new Autodesk.Viewing.UI.ControlGroup('load-model-group')
    this.group.addControl(this.button)
    toolbar.addControl(this.group)
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('LoadModelToViewExtension', LoadModelToViewExtension)
