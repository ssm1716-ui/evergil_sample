import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ],
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet',
  'script', 'indent', 'color', 'background', 'align',
];

const QuillEditor = ({ 
  value = '',
  onChange,
  onBlur,
  placeholder = '내용을 입력해주세요...',
  readOnly = false,
  className = '',
  style = {}
}) => {
  const handleChange = (content) => {
    if (onChange) {
      onChange(content);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      readOnly={readOnly}
      theme="snow"
      modules={readOnly ? { toolbar: false } : modules}
      formats={formats}
      placeholder={placeholder}
      className={className}
      style={style}
    />
  );
};

export default QuillEditor;