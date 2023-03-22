#include <iostream>

class Person {
  int age;

public:
  Person() {
    this->age = 0;
  }
  void older() {
    this->age += 1;
  }
  int getAge() {
    return this->age;
  }
};

void swap(int *a, int *b);

int main() {
  int a = 0;
  Person p;
  int *b = &a;

  std::cout << a << std::endl;
  std::cout << b << std::endl;

  *b = 999;

  std::cout << a << std::endl;
  std::cout << b << std::endl;

  int c = 21;
  int d = 69;

  swap(&c, &d);

  std::cout << c << std::endl;
  std::cout << d << std::endl;

  std::cout << p.getAge() << std::endl;
  p.older();
  std::cout << p.getAge() << std::endl;
  p.older();
  std::cout << p.getAge() << std::endl;
  p.older();
  std::cout << p.getAge() << std::endl;
  p.older();
  std::cout << p.getAge() << std::endl;

  // while (true) { 
  //   Person *p2 = new Person(); // memory leak
  //   delete p2;
  // }

  return 0;
}

void swap(int *a, int *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}