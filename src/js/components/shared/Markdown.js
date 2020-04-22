import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Markdown = ({ children }) => {
  return (
    <ReactMarkdown
      source={children}
      escapeHtml={false}
    />
  );
};

Markdown.propTypes = {
  children: PropTypes.string.isRequired
};

export default Markdown;
