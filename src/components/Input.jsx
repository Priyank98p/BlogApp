import React, { useId } from 'react'

// HOOK/WRAPPER: React.forwardRef wraps the standard component.
// It allows this custom component to receive a 'ref' from its parent 
// and pass it down directly to the native HTML <input> element inside it.
const Input = React.forwardRef(function Input({
    label,            // The text to display above the input (e.g., "Email Address")
    type = 'text',    // Defaults to a standard text box if no type is provided
    className = '',   // Allows the parent to pass custom Tailwind classes
    ...props          // Spreads any remaining props (like placeholder, value, onChange)
}, ref) {             // 'ref' is explicitly passed as the second argument here
    
    // HOOK: Generates a truly unique ID string (like ":r3:")
    const id = useId() 

    return (
        <div className='w-full'>
            {/* CONDITIONAL RENDER: Only draw the <label> if a 'label' prop was actually passed */}
            {label && (
                <label 
                    className='inline-block mb-1 pl-1'
                    // Accessibility: Connects this label to the input below using the unique ID
                    htmlFor={id} 
                > 
                    {label}
                </label>
            )}

            <input 
                type={type}
                // FIXED TYPO: Changed 'classNamme' to 'className'
                // We use template literals (`) to combine the base styles with any custom styles
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
                
                // CRITICAL: Attaches the ref passed from the parent to this specific HTML element
                ref={ref} 
                
                // Spreads all other attributes (like placeholder="Enter name") onto the input
                {...props} 
                
                // Accessibility: Connects this input to the label above using the unique ID
                id={id} 
            />
        </div>
    )
})

export default Input