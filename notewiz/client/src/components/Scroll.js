import React from 'react';
import PropTypes from 'prop-types';
import './Scroll.css'; // 导入CSS文件

const Scroll = ({ children, height }) => {
  return( 
    <div className="scroll-container" style={{ height: height || '70vh' }}>
      {children}
    </div>	
  );
}

Scroll.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string
};

export default Scroll;
