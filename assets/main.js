class MarkupExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options)
    this._group = null
    this._button = null
  }

  load() {
    console.log('MyAwesomeExtensions has been loaded')
    return true
  }

  unload() {
    // Clean our UI elements if we added any
    if (this._group) {
      this._group.removeControl(this._button)
      if (this._group.getNumberOfControls() === 0) {
        this.viewer.toolbar.removeControl(this._group)
      }
    }
    console.log('MyAwesomeExtensions has been unloaded')
    return true
  }

  onToolbarCreated() {
    // Create a new toolbar group if it doesn't exist
    this._group = this.viewer.toolbar.getControl('allMyAwesomeExtensionsToolbar')
    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup('allMyAwesomeExtensionsToolbar')
      this.viewer.toolbar.addControl(this._group)
    }

    // Add a new button to the toolbar group
    this._button = new Autodesk.Viewing.UI.Button('MarkupExtensionButton')
    this._button.onClick = (ev) => {
      const markupSidebar = document.getElementById('markupSidebar')
      const extensionMarkup = document.getElementById('extensionMarkup')
      const markupStyleSidebar = document.getElementById('markupStyleSidebar')
      const visibleStyle = markupSidebar.style.visibility

      if (visibleStyle === 'hidden' || visibleStyle === '') {
        this.viewer.loadExtension('Autodesk.Viewing.MarkupsCore')
        markupSidebar.style.visibility = 'visible'
        extensionMarkup.style.visibility = 'visible'
        markupStyleSidebar.style.visibility = 'visible'
      } else {
        this.viewer.unloadExtension('Autodesk.Viewing.MarkupsCore')
        markupSidebar.style.visibility = 'hidden'
        extensionMarkup.style.visibility = 'hidden'
        markupStyleSidebar.style.visibility = 'hidden'
      }
    }
    this._button.setToolTip('Markup Extension')
    this._button.addClass('markupExtensionIcon')
    this._group.addControl(this._button)
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('MarkupExtension', MarkupExtension)
