// ส่งฟอร์ม
if (document.getElementById('leaveForm')) {
    document.getElementById('leaveForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const reason = document.getElementById('reason').value;
        const date = document.getElementById('date').value;

        await db.collection('leaves').add({
            name,
            reason,
            date,
            approved: false
        });

        alert('ส่งคำขอลาเรียบร้อยแล้ว');
        document.getElementById('leaveForm').reset();
    });
}

// แสดงรายการลา
if (document.getElementById('leaveList')) {
    db.collection('leaves').onSnapshot(snapshot => {
        const list = document.getElementById('leaveList');
        list.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            list.innerHTML += `<li>${data.name} - ${data.reason} - ${data.date} - ${data.approved ? 'อนุมัติแล้ว' : 'รออนุมัติ'}</li>`;
        });
    });
}

// ระบบอนุมัติ
if (document.getElementById('approveList')) {
    db.collection('leaves').onSnapshot(snapshot => {
        const list = document.getElementById('approveList');
        list.innerHTML = '';
        snapshot.forEach(doc => {
            const data = doc.data();
            list.innerHTML += `<li>${data.name} - ${data.reason} - ${data.date} - ${data.approved ? 'อนุมัติแล้ว' : `<button onclick="approve('${doc.id}')">อนุมัติ</button>`}</li>`;
        });
    });
}

async function approve(id) {
    await db.collection('leaves').doc(id).update({
        approved: true
    });
    alert('อนุมัติเรียบร้อย');
}
