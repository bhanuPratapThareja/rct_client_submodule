export const validateInput = (name, value, stateInput) => {
    const { type, label, required, minLength, checkboxes } = stateInput
    let error = ''
    switch (type) {
        case 'text':
        case 'password':
            if (required && !value) {
                error = `${label} is required`
            }
            if (value && value.length < minLength) {
                error = `${label} must have atleast ${minLength} characters`
            }
            break
        case 'email':
            if (required && !value) {
                error = 'Email is required'
                break
            }
            error = !value || isEmailAddress(value) ? '' : 'Email is not valid'
            break
        case 'select':
            if (required && !value) {
                error = `Please select a ${label}`
            }
            break
        case 'checkbox':
            
            if (required) {
                const isOneSelected = checkboxes.some(checkbox => checkbox.checked)
                if (!isOneSelected) {
                    error = `Please select atleast one ${label}`
                }
            }
            break
        default:
            error = ''
    }
    return error
}

function isEmailAddress(str) {
    // eslint-disable-next-line 
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
}