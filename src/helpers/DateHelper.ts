export function formatDate(date: Date) {
    var newDate = new Date(date); 
    let year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1).toString().padStart(2, '0'); 
    let day = newDate.getDate().toString().padStart(2, '0');

    let hours = newDate.getHours().toString().padStart(2, '0');
    let minutes = newDate.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
