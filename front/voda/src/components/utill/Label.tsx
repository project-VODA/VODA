import React, { HTMLProps } from 'react';

type LabelProps = HTMLProps<HTMLLabelElement>;

const Label: React.FC<LabelProps> = (props) => {
  return <label {...props} />;
};

export default Label;
