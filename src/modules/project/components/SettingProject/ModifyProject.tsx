import { useMemo, useRef } from 'react'
import { ButtonSecondary } from 'src/components/ButtonComponent'
import InputComponent from 'src/components/InputComponent'
import toast from 'react-hot-toast'

export default function ModifyProject({
  formik,
  imgSrc,
  file,
  setFile
}: {
  formik: any
  imgSrc: string | undefined
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}) {
  const inputFile = useRef<HTMLInputElement>(null)

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const handleBrowserImage = () => {
    inputFile.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    inputFile.current?.setAttribute('value', '')

    if (fileFromLocal && (fileFromLocal.size >= 1048576 || !fileFromLocal.type.includes('image'))) {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      setFile(fileFromLocal)
    }
  }

  return (
    <div className='py-3 w-full border-b flex justify-center items-center'>
      <div className='flex items-start justify-between gap-10  flex-1'>
        <div className='space-y-2  flex-1'>
          <div className=' flex flex-col gap-2 flex-1 w-full'>
            <label htmlFor='project_name' className='text-text_primary'>
              Project Name
            </label>
            <InputComponent
              id='project_name'
              name='project_name'
              value={formik.values.project_name}
              onChange={formik.handleChange}
              className='flex-1'
            ></InputComponent>
            <div className='w-full h-[16px] mt-1'>
              {formik.errors.project_name && <span className='text-sm text-red-500'>{formik.errors.project_name}</span>}
            </div>
          </div>
          <div className=' flex flex-col gap-2'>
            <label htmlFor='project_description' className='text-text_primary'>
              Project Description
            </label>
            <InputComponent
              id='project_description'
              name='project_description'
              value={formik.values.project_description}
              onChange={formik.handleChange}
            ></InputComponent>
            <div className='w-full h-[16px]'>
              {formik.errors.project_description && (
                <span className='text-sm text-red-500'>{formik.errors.project_description}</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className='text-base text-text_primary mb-2 leading-[16px]'>Project Image</h3>
          <div className='flex gap-3'>
            <div className='w-[100px] h-[100px] bg-slate-400 rounded-md overflow-hidden'>
              {(imgSrc || previewImage) && (
                <img
                  src={previewImage || imgSrc}
                  alt='project_image'
                  className='h-full w-full object-cover rounded-md'
                  crossOrigin='anonymous'
                ></img>
              )}
            </div>
            <div>
              <div className='flex flex-col gap-3'>
                <span className='text-sm text-text_primary'>Select image to upload</span>
                <span className='text-[12px] text-text_secondary mb-[8px]'>JPEG, PNG file (1MB max)</span>
                <input
                  type='file'
                  ref={inputFile}
                  className='hidden'
                  accept='.jpeg, .png'
                  onChange={onFileChange}
                  onClick={(event) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ;(event.target as any).value = null
                  }}
                ></input>
                <ButtonSecondary sx={{ maxWidth: '96px' }} onClick={handleBrowserImage}>
                  Browser
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
