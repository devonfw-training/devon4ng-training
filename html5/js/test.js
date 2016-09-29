var webStorageSupported = typeof (Storage) !== 'undefined';

if (webStorageSupported) {
    localStorage.setItem('myName', 'John Example');
    sessionStorage.setItem('myName', 'John Example')
    
    console.log('From local: ' + localStorage.getItem('myName'));
    console.log('From session: ' + sessionStorage.getItem('myName'));
} else {
    console.log('Web Storage not supported!');
}