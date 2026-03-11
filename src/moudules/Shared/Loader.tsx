import { BallTriangle } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div >
      <BallTriangle
        height="150"
        width="150"
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
      />
    </div>
  )
}
