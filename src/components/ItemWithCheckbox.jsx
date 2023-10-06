/* eslint-disable react/prop-types */
export const ItemWithCheckbox = ({ text, onChange, checked }) => {
  return (
    <section>
      <label>{text}</label>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </section>
  );
};

export default ItemWithCheckbox;
