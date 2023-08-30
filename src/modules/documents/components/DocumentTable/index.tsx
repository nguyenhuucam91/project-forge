import { ButtonPrimary } from 'src/components/ButtonComponent'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button } from '@mui/material'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import pdf from './samle.pdf'

const docs = [
  { uri: pdf } // Local File
]

export default function DocumentTable() {
  return (
    <div className='w-full h-full bg-red-400 col-span-7'>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}></DocViewer>
      {/* Header */}
      <div>
        <div>
          <ButtonPrimary>Upload files</ButtonPrimary>
          <Button
            variant='contained'
            sx={{ width: '5px', height: '36px' }}
            startIcon={<KeyboardArrowDownIcon sx={{ margin: '0px' }} />}
          ></Button>
        </div>
      </div>
    </div>
  )
}
