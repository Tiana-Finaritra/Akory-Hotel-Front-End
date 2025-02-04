// import DataTable from 'datatables.net-dt';

const URL = "http://localhost:8000";

const tbody = $("#tbody");

function displayAllBooking(bookings) {
  let tab = ``;

  bookings.forEach((booking) => {
    let status =
      '<div class="actions"> <a href="#" class="btn btn-sm bg-success-light mr-2">Arrived</a> </div>';
    if (booking.is_cancelled == false) {
      status =
        '<div class="actions"> <a href="#" class="btn btn-sm bg-warning-light mr-2">Pending</a> </div>';
    } else if (booking.is_cancelled == true) {
      status =
        '<div class="actions"> <a href="#" class="btn btn-sm bg-danger-light mr-2">Cancelled</a> </div>';
    }
      tbody.append(`
        <tr>
          <td>BKG-${booking.id}</td>
          <td>
            <h2 class="table-avatar">
              <a href="profile.html" class="avatar avatar-sm mr-2"><img class="avatar-img rounded-circle" src="../assets/img/profiles/avatar-03.jpg" alt="User Image"></a>
              <a href="profile.html">${booking.customer_firstname} ${booking.customer_lastname}<span>#${booking.id_customer}</span></a>
              </h2>
          </td>
          <td>${booking.room_type}</td>
          <td>${booking.number_of_person}</td>
          <td>${booking.date_arrived.split('').slice(0, 10).join('')}</td>
          <td>${booking.leaving_date.split('').slice(0, 10).join('')}</td>
          <td>${booking.email}</td>
          <td>${booking.principal_contact}</td>
          <td>
            ${status}
          </td>
          <td class="text-right">
            <div class="dropdown dropdown-action"> <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v ellipse_color"></i></a>
              <div class="dropdown-menu dropdown-menu-right"> 
                <a class="dropdown-item" href="edit-booking.html"><i class="fas fa-pencil-alt m-r-5"></i> Edit</a>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_asset_${booking.id}"><i class="fas fa-trash-alt m-r-5"></i> Delete</a>
              </div>
            </div>
            <div id="delete_asset_${booking.id}" class="modal fade delete-modal" role="dialog">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center"> <img src="../assets/img/sent.png" alt="" width="50" height="46">
                      <h3 class="delete_class">Are you sure want to delete this Asset?</h3>
                      <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                        <button type="submit" class="btn btn-danger">Delete</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        `);
    })
    $(document).ready(function () {
      $('#myTable').DataTable();
    })
}

fetch(`${URL}/ReservationsWithCustomerInfo`)
  .then((res) => res.json())
  .then((data) => {
    displayAllBooking(data);
  });
