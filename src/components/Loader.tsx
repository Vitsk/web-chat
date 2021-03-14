import { ProgressBar } from 'react-materialize'

export const Loader: React.FC = (): React.ReactElement => {
  return (
    <>
      <ProgressBar className={'loader'} />
    </>
  )
}
