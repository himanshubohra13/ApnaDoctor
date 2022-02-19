const DoctorData = [
    {
        name: 'Himanshu',
        specialist: 'Eyes',
        timeSlot: {
            rightnow: false,
            '10-11': true,
            '11-12': true,
            '12-1': true,
            '2-3': true,
            '3-4': true
        },

    },
    {
        name: 'Hemant',
        specialist: 'psychiatrist',
        timeSlot: {
            rightnow: false,
            '10-11': true,
            '11-12': true,
            '12-1': true,
            '2-3': true,
            '3-4': true
        },

    },
    {
        name: 'Gautam',
        specialist: 'Neurologist',
        timeSlot: {
            rightnow: false,
            '10-11': true,
            '11-12': true,
            '12-1': true,
            '2-3': true,
            '3-4': true
        },

    },
    {
        name: 'Aakansha',
        specialist: 'Heart',
        timeSlot: {
            rightnow: false,
            '10-11': true,
            '11-12': true,
            '12-1': true,
            '2-3': true,
            '3-4': true
        },

    },
    {
        name: 'Avni',
        specialist: 'Ortho',
        timeSlot: {
            rightnow: false,
            '10-11': true,
            '11-12': true,
            '12-1': true,
            '2-3': true,
            '3-4': true
        },

    },
    {
        name: 'Harshvardhan',
        specialist: 'Gyno',
        timeSlot: {
            rightnow: false,
            '10-11': true,
            '11-12': true,
            '12-1': true,
            '2-3': true,
            '3-4': true
        },

    }
];
const tableData = document.getElementById('tableBody');
const doctorCity = document.getElementById('cityID');
const Specalization = document.getElementById('inputGroupSelect03');
const searchButton = document.getElementById('sendBtn');
console.log(document.getElementById('sendBtn'), document.getElementById('tableBody'))

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


window.onload = () => {
    DoctorData.forEach((doctor, index) => {
        let timeslotData = doctor.timeSlot;
        for (time in timeslotData) {

        }
        let tableRowData = `<td>${doctor.name}</td>
        <td>${doctor.specialist}</td>
        <td></td>`
    })


}
searchButton.addEventListener('click', () => {
    const toSend = new FormData();
    toSend.append('city', doctorCity.value);
    toSend.append('specalization', Specalization.value);
    axios.post("", toSend, {
        headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": getCookie("csrftoken"),
        },
    })

})
function btnenable(event) {
    event.target.parentElement.parentElement.nextElementSibling.children[0].classList.remove('disabled');
}
function book(event) {
    let tabData = event.target.parentElement.parentElement.querySelectorAll('td');
    const datatoappend = ['Doctor Name: ', 'Specalist: ', 'Time Slot: '];
    console.log(tabData[2].children[0].querySelectorAll("input:checked")[0].value);
    const modalBody = document.getElementById('modalBody').querySelectorAll('p');
    console.log();
    if (tabData[2].children[0].querySelectorAll('input')[0].checked) {
        console.log('inside right now', modalBody);
        document.querySelectorAll('.modal-footer')[0].classList.add('d-none');
        if (document.getElementById('modalBody').querySelector('div')) {
            document.getElementById('modalBody').querySelector('div').remove();
        }
        modalBody.forEach(element => {
            element.remove();
        })
        let newBody = document.createElement('p');
        newBody.textContent = "Wait For Doctor's Response to you appointment ";
        document.getElementById('modalBody').appendChild(newBody);
        let loader = document.createElement('div');
        loader.classList.add('loader');
        document.getElementById('modalBody').appendChild(loader);
        setTimeout(() => {
            loader.classList.remove('loader');
            document.getElementById('modalcross').click();
            document.getElementById('videobtn').classList.remove('d-none');
            alert('doctor accepted your request');

        }, 2000)


    } else {
        document.querySelectorAll('.modal-footer')[0].classList.remove('d-none');
        if (document.getElementById('modalBody').querySelector('div')) {
            document.getElementById('modalBody').querySelector('div').remove();
            document.getElementById('modalBody').appendChild(document.createElement('p'));
            document.getElementById('modalBody').appendChild(document.createElement('p'));

        }
        document.getElementById('modalBody').querySelectorAll('p').forEach((element, index) => {
            if (index == 2) {
                element.textContent = datatoappend[index] + tabData[index].children[0].querySelectorAll("input:checked")[0].value;
            }
            else
                element.textContent = datatoappend[index] + tabData[index].textContent;

        })
        let conbtn = document.getElementById('modalconfirm');
        conbtn.addEventListener('click', () => {
            document.getElementById('modalcross').click();
            document.getElementById('meetingconfirm').click();
        })
    }


}
function videoCall() {
    callFrame = window.DailyIframe.createFrame({
        iframeStyle: {
            position: "fixed",
            width: "40%",
            height: "70%",
            margin: 0,
            padding: 0,
            bottom: 0,
            right: 0,
        },
        showLeaveButton: true,
        showFullscreenButton: true,
    });
    callFrame.join({
        url: "https://apnacheckup.daily.co/SVBqZbAE0tM8BaU9J4at",
    });
    callFrame.on('left-meeting', (event) => {
        document.getElementById('aftermeetingModal').click();
        document.getElementById('videobtn').classList.add('d-none')

    })
}



