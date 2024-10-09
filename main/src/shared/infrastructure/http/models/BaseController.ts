/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';

export abstract class BaseController {
	protected abstract executeImpl(
		req: NextRequest,
		res?: NextResponse
	): Promise<void | any>;

	public async execute(req: NextRequest, res?: NextResponse): Promise<void> {
		try {
			return this.executeImpl(req, res);
		} catch (err) {
			console.log(`[BaseController]: Uncaught controller error`);
			console.log(err);
			this.fail('An unexpected error occurred');
		}
	}

	public static jsonResponse(code: number, message: string) {
		return NextResponse.json({ message }, { status: code });
	}

	public ok<T>(dto?: T) {
		if (!!dto) {
			return NextResponse.json(dto, { status: 200 });
		} else {
			return NextResponse.json(null, { status: 200 });
		}
	}

	public created() {
		return NextResponse.json(null, { status: 201 });
	}

	public clientError(message?: string) {
		return BaseController.jsonResponse(400, message ? message : 'Unauthorized');
	}

	public unauthorized(message?: string) {
		return BaseController.jsonResponse(401, message ? message : 'Unauthorized');
	}

	public paymentRequired(message?: string) {
		return BaseController.jsonResponse(
			402,
			message ? message : 'Payment required'
		);
	}

	public forbidden(message?: string) {
		return BaseController.jsonResponse(403, message ? message : 'Forbidden');
	}

	public notFound(message?: string) {
		return BaseController.jsonResponse(404, message ? message : 'Not found');
	}

	public conflict(message?: string) {
		return BaseController.jsonResponse(409, message ? message : 'Conflict');
	}

	public tooMany(message?: string) {
		return BaseController.jsonResponse(
			429,
			message ? message : 'Too many requests'
		);
	}

	public todo() {
		return BaseController.jsonResponse(400, 'TODO');
	}

	public fail(error: Error | string) {
		console.log(error);
		return NextResponse.json({ message: error.toString() }, { status: 500 });
	}
}
