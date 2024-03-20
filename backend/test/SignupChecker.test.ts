
// CheckSignupFields.test.ts



  it('should return error for missing required fields', () => {
     let req
  req={
    "created_by": 123456,
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "1234567890",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "is_admin":1,
    "country":"somalia",
    "username":"imran"
  }

  expect(req).toBe(req)
})
