import SVGInjector from '../src/svg-injector'
import { DoneCallback, EvalScripts } from '../src/types'
import * as uniqueId from '../src/unique-id'
import { cleanup, format, render } from './helpers'

suite('eval scripts', () => {
  let logStub: sinon.SinonStub
  let uniqueIdStub: sinon.SinonStub

  suiteSetup(() => {
    uniqueIdStub = window.sinon.stub(uniqueId, 'default').returns(1)
  })

  suiteTeardown(() => {
    uniqueIdStub.restore()
  })

  setup(() => {
    logStub = window.sinon.stub(console, 'log')
    render(['script', 'script'])
  })

  teardown(() => {
    logStub.restore()
    cleanup()
  })

  test('never', done => {
    const injectorDone: DoneCallback = _ => {
      const actual = format(document.getElementById('container')!.innerHTML)
      const expected = format(`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          class="injected-svg inject-me"
          data-src="/fixtures/script.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="50" cy="50" r="15" fill="green"></circle></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          class="injected-svg inject-me"
          data-src="/fixtures/script.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="50" cy="50" r="15" fill="green"></circle></svg
        >
      `)
      expect(actual).to.equal(expected)
      expect(logStub.callCount).to.equal(0)
      done()
    }
    SVGInjector(document.querySelectorAll('.inject-me'), {
      done: injectorDone,
      evalScripts: EvalScripts.Never
    })
  })

  test('once', done => {
    const injectorDone: DoneCallback = _ => {
      const actual = format(document.getElementById('container')!.innerHTML)
      const expected = format(`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          class="injected-svg inject-me"
          data-src="/fixtures/script.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="50" cy="50" r="15" fill="green"></circle></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          class="injected-svg inject-me"
          data-src="/fixtures/script.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="50" cy="50" r="15" fill="green"></circle></svg
        >
      `)
      expect(actual).to.equal(expected)
      expect(logStub.callCount).to.equal(4)
      done()
    }
    SVGInjector(document.querySelectorAll('.inject-me'), {
      done: injectorDone,
      evalScripts: EvalScripts.Once
    })
  })

  test('always', done => {
    const injectorDone: DoneCallback = _ => {
      const actual = format(document.getElementById('container')!.innerHTML)
      const expected = format(`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          class="injected-svg inject-me"
          data-src="/fixtures/script.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="50" cy="50" r="15" fill="green"></circle></svg
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          class="injected-svg inject-me"
          data-src="/fixtures/script.svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="50" cy="50" r="15" fill="green"></circle></svg
        >
      `)
      expect(actual).to.equal(expected)
      expect(logStub.callCount).to.equal(8)
      done()
    }
    SVGInjector(document.querySelectorAll('.inject-me'), {
      done: injectorDone,
      evalScripts: EvalScripts.Always
    })
  })
})
