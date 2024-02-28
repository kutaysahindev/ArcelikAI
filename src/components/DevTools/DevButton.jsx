const DevButton = ({ txt, condition, onClick }) => {
  return (
    <button className={`rp-b ${condition ? "selected" : ""}`} onClick={onClick} >{ txt }</button>
  )
}
export default DevButton