import Utils from './Utils';


beforeEach(() => {
  window.history.pushState({}, 'Test Title', '/test.html?page=1&perPage=10&orderBy=test');
});


test('addToken test', () => {
  let expectedOptions = {
    headers: {
      Authorization: 'Bearer 123'
    }
  };


  let options = Utils.addToken({});

  expect(options).toStrictEqual({});

  sessionStorage.setItem('token', "123");

  options = Utils.addToken({});

  expect(options).toStrictEqual(expectedOptions);



});

test('extractPaginationParams test', () => {
  let expectedResult = {
    page: 1,
    perPage: 10,
    orderBy: 'test'
  };

  let result = Utils.extractPaginationParams(undefined, undefined, '');

  expect(result).toStrictEqual(expectedResult);


  result = Utils.extractPaginationParams(4, 5, undefined);

  expect(result).toStrictEqual({
    page: 1,
    perPage: 10,
    orderBy: 'test'
  });

  window.history.pushState({}, 'Test Title', '/test.html?page=&perPage=&orderBy=');

  result = Utils.extractPaginationParams(4, 5, undefined);

  expect(result).toStrictEqual({
    page: 1,
    perPage: 5,
    orderBy: ""
  });

  window.history.pushState({}, 'Test Title', '/test.html?page=test&perPage=test&orderBy=');

  result = Utils.extractPaginationParams(4, 5, undefined);

  expect(result).toStrictEqual({
    page: 1,
    perPage: 5,
    orderBy: ""
  });
});


test('isUserLogin test', () => {

  sessionStorage.setItem('token', '12345');

  let isLogin = Utils.isUserLogin();

  expect(isLogin).toBe(true);

  sessionStorage.setItem('token', 'undefined');

  isLogin = Utils.isUserLogin();

  expect(isLogin).toBe(false);
});


test('getRandomProductImageUrl', () => {

  let result = Utils.getRandomProductImageUrl();

  expect(typeof result).toBe("string");
});


