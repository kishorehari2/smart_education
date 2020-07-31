import PropTypes from 'prop-types';
import React from 'react';
import { Icon } from 'watson-react-components';

var test;
// reducer to convert a list of messages into a (flat) list of results
function allResultsReducer(list, message) {
  return list.concat(message.results);
}

// reducer to extract all matched keywords from a list of results
function keywordReducer(keywords, result) {
  Object.keys(result.keywords_result || {}).forEach((k) => {
    keywords[k] = keywords[k] || []; // eslint-disable-line
    keywords[k].push(...result.keywords_result[k]);
  });
  return keywords;
}

function getSpotted(messages) {
  return messages.reduce(allResultsReducer, []).reduce(keywordReducer, {});
}

export function Keywords(props) {
  const { isInProgress, messages, keywords } = props;
  const notSpotted = isInProgress
    ? 'Not yet spotted.'
    : 'Not spotted.';
  const notSpottedIcon = isInProgress
    ? 'loader'
    : 'close';
    test=isInProgress;
  const spotted = getSpotted(messages);
  const list = keywords.map((k) => {
    const spottings = spotted[k];
    return (
      <li key={k} className="base--li">
        <Icon
          type={spottings
            ? 'success-o'
            : notSpottedIcon}
          size="small"
        /> {' '}
        <b>{k}</b>: {spottings
          ? 'Spotted - '
          : notSpotted}
        <span className="base--p_light">
          {(spottings || []).map(s => `${s.start_time}-${s.end_time}s (${Math.round(s.confidence * 100)}%)`).join(', ')}
        </span>
      </li>
    );
  });
  return (
    <div>
      <ul className="base--ul base--ul_no-bullets">
        {list}
      </ul>
    </div>
    
  );
}

Keywords.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
  keywords: PropTypes.array.isRequired, // eslint-disable-line
  isInProgress: PropTypes.bool.isRequired,
};

export function getKeywordsSummary(keywords, messages) {
  const spotted = Object.keys(getSpotted(messages)).length;
  const total = keywords.length;
  const sum = spotted / total;
  var score=0;
 if (Number(sum)>0.7)
    score=1
    else if(Number(sum)>0.35)
    score=0.5 
  sessionStorage.setItem('sum', Number(score));
  return `${spotted}/${total}`;
}

export function updateSession(keywords, messages) {
  const spotted = Object.keys(getSpotted(messages)).length;
  const total = keywords.length;
  
  //localStorage.re
  return `${spotted}/${total}`;
}

