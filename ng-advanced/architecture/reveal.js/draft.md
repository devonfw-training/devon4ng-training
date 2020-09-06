Architecture Refresher

Pitfalls:


Complexity
    - Dynamic Complexity
        - amount of data
        - granularity of backend calls
        - target platform / Browser
        - ui frameworks
        - size of application

    - Static Complexity
        - Functional Complexity
            - split into functional components for a functional concern
            - component-oriented Architecture
            - what does it do?
                provide services for other components via interfaces
                import other components interfaces
                encapsulated: implementation can be replaced
                may be reused
                may be composed of other components
                feasible unit of construction, implementation & planning
            - let's call those components 'dialogs'
            - example of functional decomposition (car configurator)

        - Technical Complexity
            - tasks:
                - displaying the ui
                - displaying business data
                - controlling dialog & flow
                - accepting user input
                - validating user input
                - controlling the presentation state
                - calling the server for logic


- Darauf aufsetzend: CQRS / Event Sourcing / Reactive Architecture / Flux Pattern
    Bild Action -> Store -> View -> Action 

Other stuff for your project
- Balance zwischen 'Not Invented Here' und 150 dependencies
- Functional requirements: Muss man IE unterstuetzen? Welche Chromeversionen?
- Browsertabs brauchen 2GB Ram, 'Script not responding' ..
- Mass-Daten in den Client reinladen, der dann die Daten sortieren, gruppieren & filtern darf
- Massmaniuplation im DOM triggered viel rendering: Rendern am Ende
- Events werden nicht sorgsam aufgeräumt, Eventlisteners triggern weitere Events..