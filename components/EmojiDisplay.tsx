const EmojiDisplay = ({ unicodeString, className }: { unicodeString: string, className?: string }) => {
    // Remove "U+" and convert the hexadecimal code to a decimal number
    const codePoint = parseInt(unicodeString.replace('U+', ''), 16);

    // Use String.fromCodePoint() to convert the code point to the actual character
    const emoji = String.fromCodePoint(codePoint);

    return (
        <div className={className}>
            {emoji}
        </div>
    );
}

export default EmojiDisplay;