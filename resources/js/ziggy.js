const Ziggy = {
    url: 'https:\/\/immo.test',
    port: null,
    defaults: {},
    routes: {
        'webpush.subscribe': { uri: 'webpush\/subscribe', methods: ['POST'] },
        'webpush.unsubscribe': {
            uri: 'webpush\/unsubscribe',
            methods: ['DELETE'],
        },
        'webpush.sw': { uri: 'sw.js', methods: ['GET', 'HEAD'] },
        'webpush.manifest': { uri: 'manifest.json', methods: ['GET', 'HEAD'] },
        'filament.exports.download': {
            uri: 'filament\/exports\/{export}\/download',
            methods: ['GET', 'HEAD'],
            parameters: ['export'],
            bindings: { export: 'id' },
        },
        'filament.imports.failed-rows.download': {
            uri: 'filament\/imports\/{import}\/failed-rows\/download',
            methods: ['GET', 'HEAD'],
            parameters: ['import'],
            bindings: { import: 'id' },
        },
        'filament.admin.auth.login': {
            uri: 'admin\/login',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.auth.logout': {
            uri: 'admin\/logout',
            methods: ['POST'],
        },
        'filament.admin.pages.dashboard': {
            uri: 'admin',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.pages.manage-app-settings': {
            uri: 'admin\/manage-app-settings',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.agencies.index': {
            uri: 'admin\/agencies',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.agencies.create': {
            uri: 'admin\/agencies\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.agencies.edit': {
            uri: 'admin\/agencies\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.avenues.index': {
            uri: 'admin\/avenues',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.avenues.create': {
            uri: 'admin\/avenues\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.avenues.edit': {
            uri: 'admin\/avenues\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.categorie-post-pivots.index': {
            uri: 'admin\/categorie-post-pivots',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.categorie-post-pivots.create': {
            uri: 'admin\/categorie-post-pivots\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.categorie-post-pivots.edit': {
            uri: 'admin\/categorie-post-pivots\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.categories.index': {
            uri: 'admin\/categories',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.categories.create': {
            uri: 'admin\/categories\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.categories.edit': {
            uri: 'admin\/categories\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.cities.index': {
            uri: 'admin\/cities',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.cities.create': {
            uri: 'admin\/cities\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.cities.edit': {
            uri: 'admin\/cities\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.comment-likes.index': {
            uri: 'admin\/comment-likes',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comment-likes.create': {
            uri: 'admin\/comment-likes\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comment-likes.edit': {
            uri: 'admin\/comment-likes\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.comment-mentions.index': {
            uri: 'admin\/comment-mentions',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comment-mentions.create': {
            uri: 'admin\/comment-mentions\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comment-mentions.edit': {
            uri: 'admin\/comment-mentions\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.comment-reports.index': {
            uri: 'admin\/comment-reports',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comment-reports.create': {
            uri: 'admin\/comment-reports\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comment-reports.edit': {
            uri: 'admin\/comment-reports\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.comments.index': {
            uri: 'admin\/comments',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comments.create': {
            uri: 'admin\/comments\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.comments.edit': {
            uri: 'admin\/comments\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.communes.index': {
            uri: 'admin\/communes',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.communes.create': {
            uri: 'admin\/communes\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.communes.edit': {
            uri: 'admin\/communes\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.contacts.index': {
            uri: 'admin\/contacts',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.contacts.create': {
            uri: 'admin\/contacts\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.contacts.edit': {
            uri: 'admin\/contacts\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.countries.index': {
            uri: 'admin\/countries',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.countries.create': {
            uri: 'admin\/countries\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.countries.edit': {
            uri: 'admin\/countries\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.currencies.index': {
            uri: 'admin\/currencies',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.currencies.create': {
            uri: 'admin\/currencies\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.currencies.edit': {
            uri: 'admin\/currencies\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.languages.index': {
            uri: 'admin\/languages',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.languages.create': {
            uri: 'admin\/languages\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.languages.edit': {
            uri: 'admin\/languages\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.media.index': {
            uri: 'admin\/media',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.media.create': {
            uri: 'admin\/media\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.media.edit': {
            uri: 'admin\/media\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.offers.index': {
            uri: 'admin\/offers',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.offers.create': {
            uri: 'admin\/offers\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.offers.edit': {
            uri: 'admin\/offers\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.payments.index': {
            uri: 'admin\/payments',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.payments.create': {
            uri: 'admin\/payments\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.payments.edit': {
            uri: 'admin\/payments\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.permissions.index': {
            uri: 'admin\/permissions',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.permissions.create': {
            uri: 'admin\/permissions\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.permissions.edit': {
            uri: 'admin\/permissions\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.posts.index': {
            uri: 'admin\/posts',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.posts.create': {
            uri: 'admin\/posts\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.posts.edit': {
            uri: 'admin\/posts\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.properties.index': {
            uri: 'admin\/properties',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.properties.create': {
            uri: 'admin\/properties\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.properties.edit': {
            uri: 'admin\/properties\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.property-documents.index': {
            uri: 'admin\/property-documents',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.property-documents.create': {
            uri: 'admin\/property-documents\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.property-documents.edit': {
            uri: 'admin\/property-documents\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.quartiers.index': {
            uri: 'admin\/quartiers',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.quartiers.create': {
            uri: 'admin\/quartiers\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.quartiers.edit': {
            uri: 'admin\/quartiers\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.reviews.index': {
            uri: 'admin\/reviews',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.reviews.create': {
            uri: 'admin\/reviews\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.reviews.edit': {
            uri: 'admin\/reviews\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.states.index': {
            uri: 'admin\/states',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.states.create': {
            uri: 'admin\/states\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.states.edit': {
            uri: 'admin\/states\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.subscriptions.index': {
            uri: 'admin\/subscriptions',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.subscriptions.create': {
            uri: 'admin\/subscriptions\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.subscriptions.edit': {
            uri: 'admin\/subscriptions\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.team-invitations.index': {
            uri: 'admin\/team-invitations',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.team-invitations.create': {
            uri: 'admin\/team-invitations\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.team-invitations.edit': {
            uri: 'admin\/team-invitations\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.teams.index': {
            uri: 'admin\/teams',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.teams.create': {
            uri: 'admin\/teams\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.teams.edit': {
            uri: 'admin\/teams\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.testimonials.index': {
            uri: 'admin\/testimonials',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.testimonials.create': {
            uri: 'admin\/testimonials\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.testimonials.edit': {
            uri: 'admin\/testimonials\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.timezones.index': {
            uri: 'admin\/timezones',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.timezones.create': {
            uri: 'admin\/timezones\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.timezones.edit': {
            uri: 'admin\/timezones\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.transactions.index': {
            uri: 'admin\/transactions',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.transactions.create': {
            uri: 'admin\/transactions\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.transactions.edit': {
            uri: 'admin\/transactions\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.users.index': {
            uri: 'admin\/users',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.users.create': {
            uri: 'admin\/users\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.users.edit': {
            uri: 'admin\/users\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.visits.index': {
            uri: 'admin\/visits',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.visits.create': {
            uri: 'admin\/visits\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.visits.edit': {
            uri: 'admin\/visits\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.shield.roles.index': {
            uri: 'admin\/shield\/roles',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.shield.roles.create': {
            uri: 'admin\/shield\/roles\/create',
            methods: ['GET', 'HEAD'],
        },
        'filament.admin.resources.shield.roles.view': {
            uri: 'admin\/shield\/roles\/{record}',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'filament.admin.resources.shield.roles.edit': {
            uri: 'admin\/shield\/roles\/{record}\/edit',
            methods: ['GET', 'HEAD'],
            parameters: ['record'],
        },
        'boost.browser-logs': {
            uri: '_boost\/browser-logs',
            methods: ['POST'],
        },
        'cashier.payment': {
            uri: 'stripe\/payment\/{id}',
            methods: ['GET', 'HEAD'],
            parameters: ['id'],
        },
        'cashier.webhook': { uri: 'stripe\/webhook', methods: ['POST'] },
        login: { uri: 'login', methods: ['GET', 'HEAD'] },
        'login.store': { uri: 'login', methods: ['POST'] },
        logout: { uri: 'logout', methods: ['POST'] },
        'password.request': {
            uri: 'forgot-password',
            methods: ['GET', 'HEAD'],
        },
        'password.reset': {
            uri: 'reset-password\/{token}',
            methods: ['GET', 'HEAD'],
            parameters: ['token'],
        },
        'password.email': { uri: 'forgot-password', methods: ['POST'] },
        'password.update': { uri: 'reset-password', methods: ['POST'] },
        register: { uri: 'register', methods: ['GET', 'HEAD'] },
        'register.store': { uri: 'register', methods: ['POST'] },
        'verification.notice': {
            uri: 'email\/verify',
            methods: ['GET', 'HEAD'],
        },
        'verification.verify': {
            uri: 'email\/verify\/{id}\/{hash}',
            methods: ['GET', 'HEAD'],
            parameters: ['id', 'hash'],
        },
        'verification.send': {
            uri: 'email\/verification-notification',
            methods: ['POST'],
        },
        'password.confirm': {
            uri: 'user\/confirm-password',
            methods: ['GET', 'HEAD'],
        },
        'password.confirmation': {
            uri: 'user\/confirmed-password-status',
            methods: ['GET', 'HEAD'],
        },
        'password.confirm.store': {
            uri: 'user\/confirm-password',
            methods: ['POST'],
        },
        'two-factor.login': {
            uri: 'two-factor-challenge',
            methods: ['GET', 'HEAD'],
        },
        'two-factor.login.store': {
            uri: 'two-factor-challenge',
            methods: ['POST'],
        },
        'two-factor.enable': {
            uri: 'user\/two-factor-authentication',
            methods: ['POST'],
        },
        'two-factor.confirm': {
            uri: 'user\/confirmed-two-factor-authentication',
            methods: ['POST'],
        },
        'two-factor.disable': {
            uri: 'user\/two-factor-authentication',
            methods: ['DELETE'],
        },
        'two-factor.qr-code': {
            uri: 'user\/two-factor-qr-code',
            methods: ['GET', 'HEAD'],
        },
        'two-factor.secret-key': {
            uri: 'user\/two-factor-secret-key',
            methods: ['GET', 'HEAD'],
        },
        'two-factor.recovery-codes': {
            uri: 'user\/two-factor-recovery-codes',
            methods: ['GET', 'HEAD'],
        },
        'two-factor.regenerate-recovery-codes': {
            uri: 'user\/two-factor-recovery-codes',
            methods: ['POST'],
        },
        'passkey.login-options': {
            uri: 'passkeys\/login\/options',
            methods: ['GET', 'HEAD'],
        },
        'passkey.login': { uri: 'passkeys\/login', methods: ['POST'] },
        'passkey.confirm-options': {
            uri: 'passkeys\/confirm\/options',
            methods: ['GET', 'HEAD'],
        },
        'passkey.confirm': { uri: 'passkeys\/confirm', methods: ['POST'] },
        'passkey.registration-options': {
            uri: 'user\/passkeys\/options',
            methods: ['GET', 'HEAD'],
        },
        'passkey.store': { uri: 'user\/passkeys', methods: ['POST'] },
        'passkey.destroy': {
            uri: 'user\/passkeys\/{passkey}',
            methods: ['DELETE'],
            parameters: ['passkey'],
            bindings: { passkey: 'id' },
        },
        pulse: { uri: 'pulse', methods: ['GET', 'HEAD'] },
        'sanctum.csrf-cookie': {
            uri: 'sanctum\/csrf-cookie',
            methods: ['GET', 'HEAD'],
        },
        'default-livewire.update': {
            uri: 'livewire-6666e030\/update',
            methods: ['POST'],
        },
        'livewire.upload-file': {
            uri: 'livewire-6666e030\/upload-file',
            methods: ['POST'],
        },
        'livewire.preview-file': {
            uri: 'livewire-6666e030\/preview-file\/{filename}',
            methods: ['GET', 'HEAD'],
            parameters: ['filename'],
        },
        'countries.index': {
            uri: '{prefix?}\/countries',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'states.index': {
            uri: '{prefix?}\/states',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'cities.index': {
            uri: '{prefix?}\/cities',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'timezones.index': {
            uri: '{prefix?}\/timezones',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'currencies.index': {
            uri: '{prefix?}\/currencies',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'languages.index': {
            uri: '{prefix?}\/languages',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'geolocate.index': {
            uri: '{prefix?}\/geolocate',
            methods: ['GET', 'HEAD'],
            parameters: ['prefix'],
        },
        'stancl.tenancy.asset': {
            uri: 'tenancy\/assets\/{path?}',
            methods: ['GET', 'HEAD'],
            wheres: { path: '(.*)' },
            parameters: ['path'],
        },
        'filament-impersonate.leave': {
            uri: 'filament-impersonate\/leave',
            methods: ['GET', 'HEAD'],
        },
        home: { uri: '\/', methods: ['GET', 'HEAD'] },
        'properties.index': { uri: 'properties', methods: ['GET', 'HEAD'] },
        'properties.show': {
            uri: 'properties\/{property}',
            methods: ['GET', 'HEAD'],
            parameters: ['property'],
            bindings: { property: 'slug' },
        },
        'properties.favorite': {
            uri: 'properties\/{property}\/favorite',
            methods: ['POST'],
            parameters: ['property'],
            bindings: { property: 'id' },
        },
        'properties.visit': {
            uri: 'properties\/{property}\/visit',
            methods: ['POST'],
            parameters: ['property'],
            bindings: { property: 'id' },
        },
        'agencies.index': { uri: 'agencies', methods: ['GET', 'HEAD'] },
        'agencies.show': {
            uri: 'agencies\/{agency}',
            methods: ['GET', 'HEAD'],
            parameters: ['agency'],
            bindings: { agency: 'slug' },
        },
        dashboard: {
            uri: '{current_team}\/dashboard',
            methods: ['GET', 'HEAD'],
            parameters: ['current_team'],
        },
        'invitations.accept': {
            uri: 'invitations\/{invitation}\/accept',
            methods: ['GET', 'HEAD'],
            parameters: ['invitation'],
            bindings: { invitation: 'code' },
        },
        'blog.index': { uri: 'blog', methods: ['GET', 'HEAD'] },
        'blog.category': {
            uri: 'blog\/category\/{category}',
            methods: ['GET', 'HEAD'],
            parameters: ['category'],
            bindings: { category: 'slug' },
        },
        'blog.show': {
            uri: 'blog\/{post}',
            methods: ['GET', 'HEAD'],
            parameters: ['post'],
            bindings: { post: 'slug' },
        },
        'blog.comment': {
            uri: 'blog\/{post}\/comment',
            methods: ['POST'],
            parameters: ['post'],
        },
        'blog.like': {
            uri: 'blog\/{post}\/like',
            methods: ['POST'],
            parameters: ['post'],
            bindings: { post: 'slug' },
        },
        'page.contact': { uri: 'contact', methods: ['GET', 'HEAD'] },
        'page.contact.store': { uri: 'contact', methods: ['POST'] },
        'page.help': { uri: 'help', methods: ['GET', 'HEAD'] },
        'page.about': { uri: 'about', methods: ['GET', 'HEAD'] },
        'page.terms': { uri: 'terms', methods: ['GET', 'HEAD'] },
        'page.privacy': { uri: 'privacy', methods: ['GET', 'HEAD'] },
        'page.cookies': { uri: 'cookies', methods: ['GET', 'HEAD'] },
        'page.support': { uri: 'support', methods: ['GET', 'HEAD'] },
        'page.faq': { uri: 'faq', methods: ['GET', 'HEAD'] },
        'page.testimonials': { uri: 'testimonials', methods: ['GET', 'HEAD'] },
        'profile.edit': { uri: 'settings\/profile', methods: ['GET', 'HEAD'] },
        'profile.update': { uri: 'settings\/profile', methods: ['PATCH'] },
        'profile.destroy': { uri: 'settings\/profile', methods: ['DELETE'] },
        'security.edit': {
            uri: 'settings\/security',
            methods: ['GET', 'HEAD'],
        },
        'user-password.update': { uri: 'settings\/password', methods: ['PUT'] },
        'appearance.edit': {
            uri: 'settings\/appearance',
            methods: ['GET', 'HEAD'],
        },
        'teams.index': { uri: 'settings\/teams', methods: ['GET', 'HEAD'] },
        'teams.store': { uri: 'settings\/teams', methods: ['POST'] },
        'teams.edit': {
            uri: 'settings\/teams\/{team}',
            methods: ['GET', 'HEAD'],
            parameters: ['team'],
            bindings: { team: 'slug' },
        },
        'teams.update': {
            uri: 'settings\/teams\/{team}',
            methods: ['PATCH'],
            parameters: ['team'],
            bindings: { team: 'slug' },
        },
        'teams.destroy': {
            uri: 'settings\/teams\/{team}',
            methods: ['DELETE'],
            parameters: ['team'],
            bindings: { team: 'slug' },
        },
        'teams.switch': {
            uri: 'settings\/teams\/{team}\/switch',
            methods: ['POST'],
            parameters: ['team'],
            bindings: { team: 'slug' },
        },
        'teams.members.update': {
            uri: 'settings\/teams\/{team}\/members\/{user}',
            methods: ['PATCH'],
            parameters: ['team', 'user'],
            bindings: { team: 'slug', user: 'id' },
        },
        'teams.members.destroy': {
            uri: 'settings\/teams\/{team}\/members\/{user}',
            methods: ['DELETE'],
            parameters: ['team', 'user'],
            bindings: { team: 'slug', user: 'id' },
        },
        'teams.invitations.store': {
            uri: 'settings\/teams\/{team}\/invitations',
            methods: ['POST'],
            parameters: ['team'],
            bindings: { team: 'slug' },
        },
        'teams.invitations.destroy': {
            uri: 'settings\/teams\/{team}\/invitations\/{invitation}',
            methods: ['DELETE'],
            parameters: ['team', 'invitation'],
            bindings: { team: 'slug', invitation: 'code' },
        },
        'storage.local': {
            uri: 'storage\/{path}',
            methods: ['GET', 'HEAD'],
            wheres: { path: '.*' },
            parameters: ['path'],
        },
        'storage.local.upload': {
            uri: 'storage\/{path}',
            methods: ['PUT'],
            wheres: { path: '.*' },
            parameters: ['path'],
        },
    },
};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
