import React from "react";

export default function Button({
    // 'children' is a special React prop. It represents whatever is placed 
    // inside the opening and closing tags of this component when it's used.
    children,
    
    // You commented this out, but it's actually good practice to keep it! 
    // By default, HTML buttons inside forms act as "submit" buttons. 
    // Setting type="button" prevents accidental page reloads.
    // type = "button", 
    
    // DEFAULT PROPS: If the parent doesn't specify colors, it defaults to a blue button with white text.
    bgColor = "bg-blue-600",
    textColor = "text-white",
    
    // Allows the parent component to inject extra Tailwind classes (like 'w-full' or 'mt-4')
    className = "",
    
    // REST OPERATOR: Collects any other standard HTML button attributes 
    // (like onClick, disabled, type="submit") into an object called 'props'.
    ...props
}) {
    return (
        <button
            // TEMPLATE LITERALS: We merge the base styles (padding, rounded corners) 
            // with the dynamic variables (colors and custom classes)
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} 
            
            // SPREAD OPERATOR: Dumps all those extra HTML attributes directly onto the DOM element
            {...props}
        >
            {/* Renders the text or icons passed into the button */}
            {children}
        </button>
    );
}