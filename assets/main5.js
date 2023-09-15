/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

;(function () {
  class DrawWalkingPathLinesToolContextMenu extends Autodesk.Viewing.Extensions.ViewerObjectContextMenu {
    constructor(tool) {
      super(tool.viewer)

      this.tool = tool
    }

    buildMenu(event, status) {
      if (!this.viewer.model) {
        return
      }

      let menu = null
      if (!this.tool.active) {
        menu = super.buildMenu(event, status)
      } else {
        menu = []
        menu.push({
          title: 'Complete Path',
          target: () => {
            this.tool.completeDrawing()
          }
        })
      }
      menu.push({
        title: 'Close Paths',
        target: () => {
          this.tool.closePaths()
        }
      })

      menu.push({
        title: 'Clear Paths',
        target: () => {
          this.tool.clearScene()
        }
      })

      return menu
    }
  }

  const DrawWalkingPathLinesToolName = 'draw-walking-path-lines-tool'
  const DrawWalkingPathLinesOverlayName = 'draw-walking-path-lines-overlay'

  class DrawWalkingPathLinesTool extends Autodesk.Viewing.ToolInterface {
    constructor(viewer, ext) {
      super()
      this.viewer = viewer
      this.extension = ext
      this.names = [DrawWalkingPathLinesToolName]
      this.active = false
      this.snapper = null
      this.lineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false,
        blending: THREE.NoBlending
      })
      this.currentPoints = []
      this.currentMesh = null
      this.intermediatePoint = null
      this.mouseMove = true
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
      // Thêm các context menu
      this.viewer.setContextMenu(new DrawWalkingPathLinesToolContextMenu(this))
      // Thêm snap
      this.snapper = new Autodesk.Viewing.Extensions.Snapping.Snapper(this.viewer, {
        /*renderSnappedGeometry: true,*/ renderSnappedTopology: true
      })
      //this.snapper.setSnapToPixel(true); // Provide intersection even when we haven't snapped to any geometry
      // thêm tool snapp vào
      this.viewer.toolController.registerTool(this.snapper)
      this.viewer.toolController.activateTool(this.snapper.getName())
      console.log('DrawWalkingPathLinesTool registered.')
    }

    deregister() {
      // set up trạng thái default cho context menu
      this.viewer.setDefaultContextMenu()
      // Xóa snap
      this.viewer.toolController.deactivateTool(this.snapper.getName())
      this.viewer.toolController.deregisterTool(this.snapper)
      this.snapper = null
      console.log('DrawWalkingPathLinesTool unregistered.')
    }
    //Xóa scene
    createScene() {
      if (!this.viewer.overlays.hasScene(DrawWalkingPathLinesOverlayName))
        this.viewer.overlays.addScene(DrawWalkingPathLinesOverlayName)
    }

    clearScene() {
      this._reset()

      if (this.viewer.overlays.hasScene(DrawWalkingPathLinesOverlayName))
        this.viewer.overlays.clearScene(DrawWalkingPathLinesOverlayName)
    }

    removeScene() {
      this._reset()

      if (this.viewer.overlays.hasScene(DrawWalkingPathLinesOverlayName))
        this.viewer.overlays.removeScene(DrawWalkingPathLinesOverlayName)
    }
    // Activate viewer
    activate(name, viewer) {
      if (!this.active) {
        this.createScene()
        console.log('DrawWalkingPathLinesTool activated.')
        this.active = true
      }
    }

    deactivate(name) {
      if (this.active) {
        console.log('DrawWalkingPathLinesTool deactivated.')
        this._reset()
        this.active = false
      }
    }
    // set quyền ưu tiên
    getPriority() {
      return 99 // Feel free to use any number higher than 0 (which is the priority of all the default viewer tools)
    }
    // MouseMove
    handleMouseMove(event) {
      if (!this.active) {
        return false
      }
      // If we placed some lines already, try to infer the endpoint of the next one based on the current mouse position
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
          case SnapType.SNAP_FACE:
          case SnapType.SNAP_CURVEDFACE:
            // console.log('Snapped to vertex', result.geomVertex);
            this.snapper.indicator.render() // Show indicator when snapped to a vertex
            if (this.currentPoints.length != 0) {
              this.mouseMove = true
              this.intermediatePoint = result.intersectPoint.clone()
              this._updateCurrentMesh()
            }
            break
          case SnapType.SNAP_EDGE:
          case SnapType.SNAP_CIRCULARARC:
          case SnapType.SNAP_CURVEDEDGE:
            // console.log('Snapped to edge', result.geomEdge);
            break
          // case SnapType.SNAP_FACE:
          // case SnapType.SNAP_CURVEDFACE:
          //     // console.log('Snapped to face', result.geomFace);
          //     break;
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
          case SnapType.SNAP_FACE:
          case SnapType.SNAP_CURVEDFACE:
            this.mouseMove = false
            if (this.currentPoints.length === 0) {
              this.currentPoints.push(result.intersectPoint.clone())
            } else {
              this.currentPoints.push(this.intermediatePoint)
            }
            this._updateCurrentMesh()
            break
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
          //udpate mesh without last mouse move
          if (this.mouseMove) {
            if (this.currentMesh) {
              this.viewer.overlays.removeMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
              this.currentMesh = null
            }

            if (this.currentPoints.length > 0) {
              const points = this.currentPoints.slice()
              this.currentMesh = this._createLineMesh(points)
              this.viewer.overlays.addMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
            }
          }

          this._reset()
          return true
        }
      }
      clearScene()
      return false
    }

    _updateCurrentMesh() {
      if (this.currentMesh) {
        this.viewer.overlays.removeMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
        this.currentMesh = null
      }
      if (this.currentPoints.length > 0) {
        const points = this.currentPoints.slice()
        if (this.intermediatePoint) {
          points.push(this.intermediatePoint)
        }
        this.currentMesh = this._createLineMesh(points)
        this.viewer.overlays.addMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
        //this.viewer.overlays.removeMesh(this.currentMesh, DrawWalkingPathLinesOverlayName);
      }
    }

    _createLineMesh(points) {
      const indices = []
      const vertices = []
      vertices.push(points[0].x, points[0].y, points[0].z)
      for (let i = 1, len = points.length; i < len; i++) {
        vertices.push(points[i].x, points[i].y, points[i].z)
        indices.push(i - 1, i)
      }
      const geom = new THREE.BufferGeometry()
      geom.addAttribute('index', new THREE.BufferAttribute(new Uint32Array(indices), 1))
      geom.addAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3))

      //console.log(vertices);
      geom.isLines = true
      return new THREE.Mesh(geom, this.lineMaterial)
    }

    completeDrawing() {
      console.log(this.currentPoints)
      if (this.mouseMove) {
        if (this.currentMesh) {
          this.viewer.overlays.removeMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
          this.currentMesh = null
        }

        if (this.currentPoints.length > 0) {
          const points = this.currentPoints.slice()
          this.currentMesh = this._createLineMesh(points)
          this.viewer.overlays.addMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
        }
      }
      this._reset()
    }

    closePaths() {
      if (this.mouseMove) {
        if (this.currentMesh) {
          this.viewer.overlays.removeMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
          this.currentMesh = null
        }

        if (this.currentPoints.length > 0) {
          if (this.currentPoints.length > 2) {
            const points = this.currentPoints.slice()
            points.push(points[0])
            this.currentMesh = this._createLineMesh(points)
            this.viewer.overlays.addMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
          } else {
            const points = this.currentPoints.slice()
            this.currentMesh = this._createLineMesh(points)
            this.viewer.overlays.addMesh(this.currentMesh, DrawWalkingPathLinesOverlayName)
          }
        }
      }
      this.deactivate()
      this.extension.drawWalkingPathButton.setState(Autodesk.Viewing.UI.Button.State.INACTIVE)
      this._reset()
    }

    _reset() {
      this.currentMesh = null
      this.currentPoints = []
      this.intermediatePoint = null
      this.snapper.indicator.clearOverlays()
    }
  }

  class WalkingPathToolExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
      super(viewer, options)
      this.tool = new DrawWalkingPathLinesTool(viewer, this)
      this.cameraTweenTool = null
      this.drawWalkingPathButton = null
    }

    async load() {
      await this.viewer.loadExtension('Autodesk.Snapping')
      await this.viewer.loadExtension('Autodesk.BimWalk')
      this.viewer.setBimWalkToolPopup(false)
      this.viewer.toolController.registerTool(this.tool)

      console.log('WalkingPathToolExtension has been loaded.')
      return true
    }

    async unload() {
      this.viewer.setBimWalkToolPopup(true)
      this.tool.removeScene()

      this.viewer.toolController.deregisterTool(this.tool)

      delete this.cameraTweenTool
      this.cameraTweenTool = null

      console.log('WalkingPathToolExtension has been unloaded.')
      return true
    }

    onToolbarCreated(toolbar) {
      const controller = this.viewer.toolController
      this.drawWalkingPathButton = new Autodesk.Viewing.UI.Button('draw-walking-path-lines-tool-button')
      this.drawWalkingPathButton.onClick = (ev) => {
        if (controller.isToolActivated(DrawWalkingPathLinesToolName)) {
          this.tool.completeDrawing()
          controller.deactivateTool(DrawWalkingPathLinesToolName)
          this.drawWalkingPathButton.setState(Autodesk.Viewing.UI.Button.State.INACTIVE)
        } else {
          controller.activateTool(DrawWalkingPathLinesToolName)
          this.drawWalkingPathButton.setState(Autodesk.Viewing.UI.Button.State.ACTIVE)
        }
      }
      this.drawWalkingPathButton.setToolTip('Draw Walking Path Lines')

      this.group = new Autodesk.Viewing.UI.ControlGroup('walking-path-tool-group')
      this.group.addControl(this.drawWalkingPathButton)
      //this.group.addControl(walkNavButton);
      toolbar.addControl(this.group)
    }
  }

  Autodesk.Viewing.theExtensionManager.registerExtension('WalkingPathToolExtension', WalkingPathToolExtension)
})()
