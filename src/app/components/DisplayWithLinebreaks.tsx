import React from 'react';

const DisplayStringWithLineBreaks = ({ text }: any) => {
    const parts = text.split('[[linebreaks]]');

    return (
        <span>
            {parts.map((part: any, index: number) => (
                <React.Fragment key={index}>
                    {part}
                    {index !== parts.length - 1 && <br />}
                </React.Fragment>
            ))}
            <br />
        </span>
    );
};

export default DisplayStringWithLineBreaks;