export function useLineBreaks(text) {
    return text.split('\n').map((line, index) => <div key={index}>{line}<br/></div>);
}