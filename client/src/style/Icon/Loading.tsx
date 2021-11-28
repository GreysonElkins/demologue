import './index.scss'

const Loading: React.FC<{ size?: string }> = ({ size = "40px" }) => {
  return (
    <div className="loading-icon">
      <div data-ico="𝇇" style={{ fontSize: size }} />
    </div>
  )
}

export default Loading
