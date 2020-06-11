

function closeSession() {
    sessionStorage.removeItem('shoppingCart');
    window.location.href = `/logout`;
}
