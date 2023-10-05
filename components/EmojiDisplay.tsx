const EmojiDisplay = ({ unicodeString, className }: { unicodeString: string, className?: string }) => {
    // Remove "U+" and convert the hexadecimal code to a decimal number
    
    if (unicodeString.length < 1)
        return <></>

    const codePoint = parseInt(unicodeString.replace(' ', '').replace('U+', ''), 16);

    // Use String.fromCodePoint() to convert the code point to the actual character
    const emoji = String.fromCodePoint(typeof codePoint === 'number' ? codePoint : 0);

    return (
        <div className={className}>
            {emoji}
        </div>
    );
}

export default EmojiDisplay;