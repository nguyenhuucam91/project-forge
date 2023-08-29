import FolderComponent from '../FolderComponent'

const folders = [
  {
    _id: 1,
    folder_name: 'folder 1',
    files: [
      {
        _id: 1.1,
        file_name: 'structure 1',
        version: 0
      },
      {
        _id: 1.2,
        file_name: 'structure 2',
        version: 0
      },
      {
        _id: 1.3,
        file_name: 'structure 3',
        version: 0
      },
      {
        _id: 1.4,
        file_name: 'structure 4',
        version: 0
      },
      {
        _id: 1.5,
        file_name: 'structure 5',
        version: 0
      }
    ]
  },
  {
    _id: 2,
    folder_name: 'folder 2',
    files: [
      {
        _id: 2.1,
        file_name: 'structure 1',
        version: 0
      },
      {
        _id: 2.2,
        file_name: 'structure 2',
        version: 0
      },
      {
        _id: 2.3,
        file_name: 'structure 3',
        version: 0
      },
      {
        _id: 2.4,
        file_name: 'structure 4',
        version: 0
      },
      {
        _id: 2.5,
        file_name: 'structure 5',
        version: 0
      }
    ]
  },
  {
    _id: 3,
    folder_name: 'folder 3',
    files: [
      {
        _id: 3.1,
        file_name: 'structure 1',
        version: 0
      },
      {
        _id: 3.2,
        file_name: 'structure 3',
        version: 0
      },
      {
        _id: 3.3,
        file_name: 'structure 3',
        version: 0
      },
      {
        _id: 3.4,
        file_name: 'structure 4',
        version: 0
      },
      {
        _id: 3.5,
        file_name: 'structure 5',
        version: 0
      }
    ]
  }
]

export default function DocumentNavbar() {
  return (
    <div className='w-full h-full bg-gray-100 hidden xl:block'>
      {folders &&
        folders.length > 0 &&
        folders.map((folder) => <FolderComponent key={folder._id} folder={folder}></FolderComponent>)}
    </div>
  )
}
