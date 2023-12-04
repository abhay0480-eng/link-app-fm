/* eslint-disable react/prop-types */
import classnames from "classnames"


const ImageIcon = ({ img,className, ...rest  }) => {
  const allClassNames = classnames(className )
  return (
    <img src={`/images/${img}.svg`}  alt="" className={`${allClassNames}`} {...rest}/>
  )
}

export default ImageIcon