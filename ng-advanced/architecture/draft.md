Architecture Refresher

- Angular Application = SPA.
    Client: UI (view)
            UI (logic)
            UI (data)
    ------------------------
    Server: Business Logic

Pitfalls:
- Functional requirements: Muss man IE unterstützen? Welche Chromeversionen?
- Browsertabs brauchen 2GB Ram, 'Script not responding' ..
- Mass-Daten in den Client reinladen, der dann die Daten sortieren, gruppieren & filtern darf
- Massmaniuplation im DOM triggered viel rendering: Rendern am Ende
- Events werden nicht sorgsam aufgeräumt, Eventlisteners triggern weitere Events..

Complexity
    - Dynamic Complexity
        - amount of data
        - granularity of backend calls
        - target platform / Browsertabs
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
                may be reused (real world says naah)
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

devonfw reference client archiecture:
    unterstützung der NFR: maintainability, scalability, efficiency, portability
    technical architecture, not functional nor technical infrastructure architecture

    https://devonfw.com/website/pages/docs/master-devon4ng.asciidoc_architecture.html#meta-architecture.asciidoc_devonfw-reference-client-architecture

    - client architecture
    https://devonfw.com/website/pages/docs/master-devon4ng.asciidoc_architecture.html#meta-architecture.asciidoc_client-architecture
        - dialog component
            logical, self-contained part of the UI. accepts user input, actions & controls communication with user
            use services to execute business logic
            have own data, state & logic
            can be used to form a hierarchy
            can interact with each other
        - dialog container
            bootstrapping client application & environment
            configuration of client
            initialization of application server access component
            controlling the lifecycle
            controlling dialog flow
            providing means of interaction between dialogs
            providing services to dialog components (i.e. caching, data storage)
            shutdown of application
        - application server access
            backend calls - including handling of headers

    - dialog container architecture
    https://devonfw.com/website/pages/docs/master-devon4ng.asciidoc_architecture.html#meta-architecture.asciidoc_dialog-container-architecture
    configuration mgmt: deployment to different environments, using specific configuration there
    dialog mgmt: defining, creating & destroying dialog components (and all children) - basic lifecycle capabilities
    service registry: define, register and lookup services - independent of dialog hierarchy
    - dialog component architecture
    https://devonfw.com/website/pages/docs/master-devon4ng.asciidoc_architecture.html#meta-architecture.asciidoc_dialog-component-architecture
    tasks (see technical complexity)
    presentation layer: generates and displayers the ui, accepts input and binds them to dialog core layer
    dialog core layer: processing of user interaction, validating, logical dialog state, commuication with applcation server access component services

    Dialog components can be hierarchically composed
    https://devonfw.com/website/pages/docs/master-devon4ng.asciidoc_architecture.html#meta-architecture.asciidoc_interactions-between-dialog-components


Meta Architecture in Action

- Simplified MVC Pattern (MVVM)
    + Two-Way Databinding between View & ViewModel
    MVC vs MVVM gfx
    https://miro.medium.com/max/263/1*D6i6nFCXn1yHfQ_MbE497w.png

- Projektstruktur: 'module'
    + Buckets for Components, Directives, Pipes & Services
    + struktur aufgetrennt in Domänen/Features
    + Nested Modules möglich
    + Lazy Loading möglich

- Componentenbaum
 Smart vs Dumb Components

Declarative & Dumb
Smart & Thin
Fat, Happy & Specific




- Darauf aufsetzend: CQRS / Event Sourcing / Reactive Architecture / Flux Pattern
    Bild Action -> Store -> View -> Action 

Other stuff for your project
- Balance zwischen 'Not Invented Here' und 150 dependencies
