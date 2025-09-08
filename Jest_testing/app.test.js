const supertest = require('supertest')
const server = require('./app.js')
const requestWithSupertest = supertest(server);

const {sum} = require('./modules.js');


// testing api

describe('Testing api', ()=>{
    test('Get /', async ()=>{
        const result = await requestWithSupertest.get('/');
        expect(result.status).toBe(200);
        expect(result.type).toEqual(expect.stringContaining('json'));
    });
});

// common matcher
// describe('common matcher', () =>{
//     test('Testing 5 + 5 to be 10', ()=>{
//         expect(sum(5,5)).toBe(10);
//     });

//     test('Testing 3 + 2 not to be 10', () =>{
//         expect(sum(3,2)).not.toBe(10);
//     });

//     test('Testing data to be equal', () =>{
//         const data = {name : 'farlan'};
//         data['age'] = 24;
//         expect(data).toEqual({
//             name    : 'farlan',
//             age     : 24
//         });
//     });
// });

// describe('Truthiness', () =>{
//     test('null', () => {
//         const n = null;
//         expect(n).toBeNull();
//         expect(n).toBeDefined();
//         expect(n).not.toBeUndefined();
//         expect(n).not.toBeTruthy();
//         expect(n).toBeFalsy();
//     });

//     test('zero', () => {
//         const z = 0;
//         expect(z).not.toBeNull();
//         expect(z).toBeDefined();
//         expect(z).not.toBeUndefined();
//         expect(z).not.toBeTruthy();
//         expect(z).toBeFalsy();
//     });
// });              

// test('Testing match', ()=>{
//     expect('team').toMatch(/a/);
// });

