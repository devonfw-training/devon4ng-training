var jsEngine = function (fns) {
        var idSequencer = function () {
                var current = 0;
                return {
                    next: function () {
                        current += 1;
                        return 'elem' + current;
                    }
                }
            }(),

            createCommandElement = function (id, command) {
                return $('<pre></pre>', {id: id})
                    .addClass('code-element')
                    .append(
                    $('<code></code>')
                        .addClass('javascript')
                        .text(command));
            },

            addCommandElementToEngine = function (commandElement) {
                commandElement.appendTo('#js-engine-core');
            },

            callStack = function () {
                var stack = [];

                return {
                    push: function (command) {
                        var top = 160 - stack.length * 40;
                        command.element.animate({
                            top: top + 'px',
                            left: '60px'
                        });
                        stack.push(command);
                    },
                    pop: function () {
                        stack.pop();
                    }
                };
            }(),

            eventTable = function () {
                return {
                    push: function (command) {
                        command.element.animate({top: '70px', left: '350px'});
                    }
                };
            }(),

            eventQueue = function () {
                return {
                    push: function (command) {
                        command.element.animate({top: '190px', left: '350px'});
                    }
                };
            }(),

            console = function () {
                var stack = [];
                return {
                    push: function (command) {
                        var top = 70 + stack.length * 40;
                        command.element.animate({
                            top: top + 'px',
                            left: '650px'
                        });
                        stack.push(command);
                    },
                    pop: function () {
                        stack.pop();
                    }
                };
            }();

        return {
            addToCallStack: function (command) {
                callStack.push(command);
            },
            addToEventTable: function (command) {
                eventTable.push(command);
            },
            removeFromCallStack: function (command) {
                callStack.pop();
            },
            createCommand: function (commandName) {
                var id = idSequencer.next();
                return {
                    id: id,
                    name: commandName,
                    element: createCommandElement(id, commandName)
                };
            },
            addCommandToEngine: function (command) {
                addCommandElementToEngine(command.element);
            },
            removeCommandFromEngine: function (command) {
                command.element.css({
                    top: '0px',
                    left: '0px'
                });
                command.element.remove();
            },
            addToConsole: function (command) {
                console.push(command);
            },
            removeFromConsole: function (command) {
                console.pop();
            },
            addToEventQueue: function (command) {
                eventQueue.push(command);
            }
        };
    }(),
    jsEngineSteps = function () {
        var that = {},
            currentStep = -1,
            steps = [],
            mainCmd = jsEngine.createCommand('main()'),
            fooCmd = jsEngine.createCommand('foo()'),
            barCmd = jsEngine.createCommand('bar()'),
            setTimeoutCmd = jsEngine.createCommand('setTimeout()'),
            log1Cmd = jsEngine.createCommand('console.log(\'foo...\')'),
            log1ConsoleCmd = jsEngine.createCommand('> foo...'),
            log2Cmd = jsEngine.createCommand('console.log(\'bar...\')'),
            log2ConsoleCmd = jsEngine.createCommand('> bar...');

        steps.push({
            forward: function () {
                jsEngine.addCommandToEngine(mainCmd);
                jsEngine.addToCallStack(mainCmd);
            },
            backward: function () {
                jsEngine.removeFromCallStack(mainCmd);
                jsEngine.removeCommandFromEngine(mainCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addCommandToEngine(fooCmd);
                jsEngine.addToCallStack(fooCmd);
            },
            backward: function () {
                jsEngine.removeFromCallStack(fooCmd);
                jsEngine.removeCommandFromEngine(fooCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addCommandToEngine(setTimeoutCmd);
                jsEngine.addToCallStack(setTimeoutCmd);
            },
            backward: function () {
                jsEngine.removeFromCallStack(setTimeoutCmd);
                jsEngine.removeCommandFromEngine(setTimeoutCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addCommandToEngine(barCmd);
                jsEngine.addToEventTable(barCmd);
            },
            backward: function () {
                jsEngine.removeCommandFromEngine(barCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.removeFromCallStack(setTimeoutCmd);
                jsEngine.removeCommandFromEngine(setTimeoutCmd);
            },
            backward: function () {
                jsEngine.addCommandToEngine(setTimeoutCmd);
                jsEngine.addToCallStack(setTimeoutCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addCommandToEngine(log1Cmd);
                jsEngine.addToCallStack(log1Cmd);
            },
            backward: function () {
                jsEngine.removeFromCallStack(log1Cmd);
                jsEngine.removeCommandFromEngine(log1Cmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.removeFromCallStack(log1Cmd);
                jsEngine.removeCommandFromEngine(log1Cmd);

                jsEngine.addCommandToEngine(log1ConsoleCmd);
                jsEngine.addToConsole(log1ConsoleCmd);
            },
            backward: function () {
                jsEngine.removeFromConsole(log1ConsoleCmd);
                jsEngine.removeCommandFromEngine(log1ConsoleCmd);

                jsEngine.addCommandToEngine(log1Cmd);
                jsEngine.addToCallStack(log1Cmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.removeFromCallStack(fooCmd);
                jsEngine.removeCommandFromEngine(fooCmd);
            },
            backward: function () {
                jsEngine.addCommandToEngine(fooCmd);
                jsEngine.addToCallStack(fooCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.removeFromCallStack(mainCmd);
                jsEngine.removeCommandFromEngine(mainCmd);
            },
            backward: function () {
                jsEngine.addCommandToEngine(mainCmd);
                jsEngine.addToCallStack(mainCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addToEventQueue(barCmd);
            },
            backward: function () {
                jsEngine.addToEventTable(barCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addToCallStack(barCmd);
            },
            backward: function () {
                jsEngine.removeFromCallStack(barCmd);
                jsEngine.addToEventQueue(barCmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.addCommandToEngine(log2Cmd);
                jsEngine.addToCallStack(log2Cmd);
            },
            backward: function () {
                jsEngine.removeFromCallStack(log2Cmd);
                jsEngine.removeCommandFromEngine(log2Cmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.removeFromCallStack(log2Cmd);
                jsEngine.removeCommandFromEngine(log2Cmd);

                jsEngine.addCommandToEngine(log2ConsoleCmd);
                jsEngine.addToConsole(log2ConsoleCmd);
            },
            backward: function () {
                jsEngine.removeFromConsole(log2ConsoleCmd);
                jsEngine.removeCommandFromEngine(log2ConsoleCmd);

                jsEngine.addCommandToEngine(log2Cmd);
                jsEngine.addToCallStack(log2Cmd);
            }
        });
        steps.push({
            forward: function () {
                jsEngine.removeFromCallStack(barCmd);
                jsEngine.removeCommandFromEngine(barCmd);
            },
            backward: function () {
                jsEngine.addCommandToEngine(barCmd);
                jsEngine.addToCallStack(barCmd);
            }
        });

        that.hasNext = function () {
            return currentStep < steps.length - 1;
        };
        that.hasPrevious = function () {
            return currentStep >= 0;
        };
        that.forward = function () {
            if (that.hasNext()) {
                currentStep += 1;
                steps[currentStep].forward();
            }
        };
        that.backward = function () {
            if (that.hasPrevious()) {
                steps[currentStep].backward();
                currentStep -= 1;
            }
        };
        return that;
    }();






