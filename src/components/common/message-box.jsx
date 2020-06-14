import Swal from 'sweetalert2'

export function confirmDelete(ids, deleteFunction) {
  Swal.fire({
    title: 'Are you sure?',
    html: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      deleteFunction(ids)
    }
  })
}

export function confirmArchive(ids, archiveFunction) {
  Swal.fire({
    title: 'Are you sure?',
    html: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, archived it!'
  }).then((result) => {
    if (result.value) {
      archiveFunction(ids)
    }
  })
}

export function confirmSubmitCollection(length,submitFunction) {
  Swal.fire({
    title: 'Are you sure?',
    html: "Submit " + length + " Task?",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.value) {
      submitFunction()
    }
  })
}

export function notification(title, text, func, type = "") {
  Swal.fire({
    title: title,
    html: text,
    type: type,
    showCancelButton: false,
    confirmButtonText: 'Continue'
  }).then((result) => {
    if (result.value) {
      func()
    }
  })
}

export function confirmReleaseLock(ids, releaseLockFunction) {
  Swal.fire({
    title: 'Are you sure?',
    html: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, release lock it!'
  }).then((result) => {
    if (result.value) {
      releaseLockFunction(ids)
    }
  })
}

export function confirmSubmit(ids, submitFunction) {
  Swal.fire({
    title: 'Are you sure?',
    html: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit it!'
  }).then((result) => {
    if (result.value) {
      submitFunction(ids)
    }
  })
}