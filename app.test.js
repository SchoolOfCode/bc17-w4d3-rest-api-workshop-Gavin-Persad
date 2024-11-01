import request from 'supertest';
import app from './app.js';
import astronauts from './libs/data.js';
import { createAstronaut, updateAstronautById } from './models/astronauts.js';

const astronautToPost = {
	id: '9999',
	firstName: 'Nilly',
	lastName: 'Vanilly',
	rank: '',
	suitSize: 'XXL',
	helmetSize: 'XXS',
	specialSkill: '',
	dob: '',
	missions: [
		{
			title: '',
			dates: { start: '', finish: '' },
			extravehicularActivities: 5,
		},
	],
};

const astronautToDelete = {
	id: '7777',
	firstName: 'Gemini',
	lastName: 'Harris',
	rank: '',
	suitSize: 'XXL',
	helmetSize: 'XXS',
	specialSkill: '',
	dob: '',
	missions: [
		{
			title: '',
			dates: { start: '', finish: '' },
			extravehicularActivities: 5,
		},
	],
};

const astronautToPut = {
	id: '1111',
	firstName: 'Curtis',
	lastName: 'Mongoose',
	rank: '',
	suitSize: 'XXL',
	helmetSize: 'XXS',
	specialSkill: '',
	dob: '',
	missions: [
		{
			title: '',
			dates: { start: '', finish: '' },
			extravehicularActivities: 5,
		},
	],
};

describe('Task 1 - GET /astronauts', () => {
	it('should return all astronauts', async () => {
		const res = await request(app).get('/astronauts');
		const expected = { success: true, payload: astronauts };
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});

describe('Task 2 - POST /astronauts', () => {
	it('should create a new astronaut', async () => {
		const res = await request(app).post('/astronauts').send(astronautToPost);
		const expected = { success: true, payload: astronautToPost };
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});

describe('Task 3 - GET /astronauts/:id', () => {
	it('should retrieve an astronaut by id', async () => {
		const res = await request(app).get('/astronauts/1111');
		const expected = { success: true, payload: astronauts[0] };
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});

describe('Task 4 - PUT /astronauts/:id', () => {
	it('should replace an astronaut by id', async () => {
		const res = await request(app)
			.put(`/astronauts/${astronautToPut.id}`)
			.send(astronautToPut);
		const expected = { success: true, payload: astronautToPut };
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});

describe('Task 5 - DELETE /astronauts/:id', () => {
	it('should delete an astronaut by id', async () => {
		const astronaut = await createAstronaut(astronautToDelete);
		const res = await request(app).delete(
			`/astronauts/${astronautToDelete.id}`
		);
		const expected = { success: true, payload: astronaut };
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});

describe('Task 6 - PATCH /astronauts/:id', () => {
	it('should update an astronaut by id', async () => {
		const astronautUpdate = {
			firstName: 'Zainab',
		};
		const updateID = '1112';
		const astronaut = await updateAstronautById(updateID, astronautUpdate);
		const res = await request(app)
			.patch(`/astronauts/${updateID}`)
			.send(astronautUpdate);
		const expected = { success: true, payload: astronaut };
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});

describe('Bonus Task - GET /astronauts/search/:name', () => {
	it('should retrieve astronauts by name', async () => {
		const res = await request(app).get('/astronauts/search/Gary');
		const expected = {
			success: true,
			payload: astronauts.filter(
				({ firstName, lastName }) =>
					firstName.toLowerCase().includes('gary'.toLowerCase()) ||
					lastName.toLowerCase().includes('gary'.toLowerCase())
			),
		};
		const actual = res.body;

		expect(actual).toEqual(expected);
	});
});
