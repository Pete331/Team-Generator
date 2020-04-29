// TODO: Write code to define and export the Employee class
class employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }
}

employee1 = new employee("Pete", 123, "pete@few.com", "manager");
console.log(employee1.email);
