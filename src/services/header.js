export function HeaderAuth() {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}

export function Header() {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}