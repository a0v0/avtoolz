//go:build js && wasm

package main

import (
	"errors"
	"syscall/js"
)

func main() {
	testFunc := js.FuncOf(testWrapper)
	js.Global().Set("add", testFunc)
	defer testFunc.Release()
	<-make(chan bool)
}

// testWrapper wraps the validate function with `syscall/js` parameters
func testWrapper(_ js.Value, args []js.Value) any {
	if len(args) != 2 {
		return response("", errors.New("missing `policy` argument"))
	} else if len(args) < 2 {
		return response("", errors.New("missing `test` argument"))
	}
	num1 := args[0].Int()
	num2 := args[1].Int()
	output, err := TestPolicy(num1, num2)
	if err != nil {
		return response(false, err)
	}
	return response(output, nil)
}

// TestPolicy is out-of-scope for this example, we'll just assume it returns true with no error
func TestPolicy(num1, num2 int) (int, error) {
	return num1 + num2, nil
}

func response(out any, err error) any {
	if err != nil {
		out = err.Error()
	}
	return map[string]any{"result": out, "isError": err != nil}
}
