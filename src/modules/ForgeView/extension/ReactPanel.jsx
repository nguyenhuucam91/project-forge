import ReactPanelContent from '../components/ReactPanelContent'
import './ReactPanel.css'
import React from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line no-undef
export default class ReactPanel extends Autodesk.Viewing.UI.DockingPanel {
  /// //////////////////////////////////////////////////////
  //
  //
  /// //////////////////////////////////////////////////////
  constructor(viewer, options) {
    super(viewer.container, options.id, 'hiep Nguyen', {
      addFooter: false,
      viewer
    })

    const titleDom = document.createElement('span')
    titleDom.innerHTML = 'hiep nguyen'
    this.container.classList.add('react-docking-panel')
    this.title.classList.add('react-docking-title')
    this.DOMContent = document.createElement('div')

    this.DOMContent.className = 'h-full w-full min-w-[500px] min-h-[500px]'

    this.container.appendChild(this.DOMContent)
  }

  /// //////////////////////////////////////////////////////
  //
  //
  /// //////////////////////////////////////////////////////
  initialize() {
    super.initialize()

    this.viewer = this.options.viewer

    this.footer = this.createFooter()

    this.container.appendChild(this.footer)
  }

  /// //////////////////////////////////////////////////////
  //
  //
  /// //////////////////////////////////////////////////////
  setVisible(show) {
    super.setVisible(show)
    if (show) {
      if (this.reactNode === null || this.reactNode === undefined) {
        this.reactNode = createRoot(this.DOMContent)
      }
      this.reactNode.render(<ReactPanelContent></ReactPanelContent>)
    } else if (this.reactNode) {
      this.reactNode.unmount(this.DOMContent)
      this.reactNode = null
    }
  }
}
