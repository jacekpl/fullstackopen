import React from "react"
import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog";

describe('<Blog/>', () => {
    test('renders title and author, but not url and likes', () => {
        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'https://www.google.com',
            likes: 0,
            user: {
                username: 'test'
            }
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={blog.user}/>
        ).container

        const title = component.querySelector('.title')
        expect(title).toHaveTextContent('Test title')

        const author = component.querySelector('.author')
        expect(author).toHaveTextContent('Test author')

        const url = component.querySelector('.url')
        expect(url).toBeNull()

        const likes = component.querySelector('.likes')
        expect(likes).toBeNull()
    });

    test('show url and likes when button is clicked', async () => {
        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'https://www.google.com',
            likes: 5,
            user: {
                username: 'test'
            }
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={blog.user}/>
        )

        const user = userEvent.setup()
        const button = component.getByText('view')
        await user.click(button)

        const url = component.container.querySelector('.url')
        expect(url).toHaveTextContent('https://www.google.com')

        const likes = component.container.querySelector('.likes')
        expect(likes).toHaveTextContent('likes 5')
    })

    test('clicking the like button twice calls event handler twice', async () => {
        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'https://www.google.com',
            likes: 5,
            user: {
                username: 'test'
            }
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} user={blog.user}/>
        )

        const user = userEvent.setup()
        const button = component.getByText('view')
        await user.click(button)

        const likeButton = component.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
});