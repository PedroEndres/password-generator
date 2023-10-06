/* eslint-disable react/prop-types */
export const ItemWithCheckbox = ({ text, onChange, checked }) => {
  return (
    <>
      <label>{text}
      <input type="checkbox" id={text} checked={checked} onChange={onChange} />
      </label>  
    </>
  );
};

export default ItemWithCheckbox;
