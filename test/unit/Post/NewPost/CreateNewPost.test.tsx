import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CreateNewPost } from '../../../../src/Post/NewPost/CreateNewPost.tsx'
import { mockCreateNewPostHook } from '../../../utils/MockCreateNewPostHook.ts'
import userEvent from '@testing-library/user-event'
import { wrapWithModal } from '../../../utils/rendeHelpers.tsx'

describe('CreateNewPost', () => {
  const draft = { title: 'a title', tags: '1,2,3', text: 'post text' }

  it('should have create button disabled with an empty draft', async () => {
    mockCreateNewPostHook({ draft: { title: '', tags: '', text: '' } })
    render(<CreateNewPost />, wrapWithModal())

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should have create button disabled when title is missing', async () => {
    mockCreateNewPostHook({ draft: { title: '', tags: '1', text: 'txt' } })
    render(<CreateNewPost />, wrapWithModal())

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should have create button disabled when tags are missing', async () => {
    mockCreateNewPostHook({ draft: { title: 'tit', tags: '', text: 'txt' } })
    render(<CreateNewPost />, wrapWithModal())

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should have create button disabled when text is missing', async () => {
    mockCreateNewPostHook({ draft: { title: 'tit', tags: '1', text: '' } })
    render(<CreateNewPost />, wrapWithModal())

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should show loading when the post is creating', async () => {
    mockCreateNewPostHook({ isCreating: true })
    render(<CreateNewPost />, wrapWithModal())

    await userEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  })

  it('should show the draft values', async () => {
    mockCreateNewPostHook({ draft: { title: 'a title', tags: '1,2,3', text: 'post text' } })
    render(<CreateNewPost />, wrapWithModal())

    expect(screen.getByLabelText('Title')).toHaveValue('a title')
    expect(screen.getByLabelText('Tags')).toHaveValue('1,2,3')
    expect(screen.getByLabelText('Text')).toHaveValue('post text')
  })

  it('should update the draft while typing on title', async () => {
    const hook = mockCreateNewPostHook({ draft: { title: '1', tags: '', text: '' } })
    render(<CreateNewPost />, wrapWithModal())

    await userEvent.type(screen.getByLabelText('Title'), '2')

    expect(hook.updateDraft).toHaveBeenCalledTimes(1)
    expect(hook.updateDraft).toHaveBeenCalledWith({
      title: '12',
      tags: '',
      text: '',
    })
  })

  it('should update the draft while typing on tags', async () => {
    const hook = mockCreateNewPostHook({ draft: { title: '', tags: '1', text: '' } })
    render(<CreateNewPost />, wrapWithModal())

    await userEvent.type(screen.getByLabelText('Tags'), '2')

    expect(hook.updateDraft).toHaveBeenCalledTimes(1)
    expect(hook.updateDraft).toHaveBeenCalledWith({
      title: '',
      tags: '12',
      text: '',
    })
  })

  it('should update the draft while typing on text', async () => {
    const hook = mockCreateNewPostHook({ draft: { title: '', tags: '', text: '1' } })
    render(<CreateNewPost />, wrapWithModal())

    await userEvent.type(screen.getByLabelText('Text'), '2')

    expect(hook.updateDraft).toHaveBeenCalledTimes(1)
    expect(hook.updateDraft).toHaveBeenCalledWith({
      title: '',
      tags: '',
      text: '12',
    })
  })

  it('should publish the draft without errors', async () => {
    const hook = mockCreateNewPostHook({ draft: { title: 'a title', tags: '1,2,3', text: 'post text' } })
    render(<CreateNewPost />, wrapWithModal())

    await userEvent.click(screen.getByRole('button'))

    expect(hook.publishDraft).toHaveBeenCalled()
    expect(screen.queryByTestId('create-new-post-error')).not.toBeInTheDocument();
  })

  it('should show an error', async () => {
    mockCreateNewPostHook({ draft, publishDraft: () => Promise.reject('Network error') })
    render(<CreateNewPost />, wrapWithModal())

    await userEvent.click(screen.getByRole('button'))

    expect(screen.queryByTestId('create-new-post-error')).toBeInTheDocument();
    expect(screen.queryByTestId('create-new-post-error')).toHaveTextContent('Network error');
  })
})
