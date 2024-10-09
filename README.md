<h1 align="center">Mini-Forum</h1>

> A simple forum made with TypeScript using Next.js as the framework. I created this project to practice my skills in Software Architecture, focusing on Domain-Driven Design (DDD) best practices, Clean Architecture, and SOLID principles.

## About 

Mini-Forum is heavily inspired by [ddd-forum](https://github.com/stemmlerjs/ddd-forum), As mentioned earlier, this is a practice project with the primary goal of enhancing my skills in various areas of software development.
I aim to use the best techniques to create a high-quality product. The project will be deployed soon; however, there are still configurations I need to finalize.
While much of the core code is based on ddd-forum for a quicker start, I am actively making changes to improve and differentiate it from the original.

## Running the project

Since this is a Next.js project, it’s quite easy to run. Just follow these steps:

1. Clone the repository
```bash
git clone https://github.com/DkillG/Mini-Forum
```

2. Go to the main folder
```bash
cd Mini-Forum/main
```

3. Install the need dependencies
```bash
npm install
```

4. Run it as dev mode
```bash
npm run dev
```

Happy hacking!

#### Backend

There is not important dependencies for the Backend, but I'll add it soon :)
Just minor libs as Prisma ORM or cuid2

#### Frontend

- [Next.JS](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [RadixUI](https://www.radix-ui.com/)

### Architecture (from ddd-forum)

We built this based on the [Clean Architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/), [SOLID principles](https://khalilstemmler.com/articles/solid-principles/solid-typescript/), and [Domain-Driven Design](https://khalilstemmler.com/articles/domain-driven-design-intro/) best practices using TypeScript.

#### Clean architecture

There's obviously a lot that went into building this from front to back.

The **Clean Architecture** is a way to reason about where different types of application logic belongs. 

<img width="1586" alt="Frame 8 (1)" src="https://user-images.githubusercontent.com/6892666/66703014-dc540e80-ecdb-11e9-81ac-9cc24e28f8c3.png">


There's a lot more to learn about the clean architecture, but for now- just know that it's a way to really separate the concerns of everything that goes into building complex enterprise applications. You'll never see any `infrastructure`-related code alongside `domain` layer code.

The clean architecture, when combined with Domain-Driven Design, is very powerful :) 

In DDD, we build applications on top of a number of subdomains.

##

Thank you for watching!
