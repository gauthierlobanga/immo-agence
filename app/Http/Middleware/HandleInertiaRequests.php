<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Settings\SettingApp;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default with every Inertia response.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $this->resolveUser($request);
        $appSettings = app(SettingApp::class);

        $sharedData = [
            ...parent::share($request),
            'name' => $appSettings->name,
            'app_logo' => $appSettings->logoUrl(),
            'auth' => $this->getAuthData($user),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => $this->getFlashData($request),
            'currentTeam' => fn () => $user?->currentTeam ? $user->toUserTeam($user->currentTeam) : null,
            'teams' => fn () => $user?->toUserTeams(includeCurrent: true) ?? [],

        ];

        return $sharedData;
    }

    /**
     * Prépare les données d'authentification partagées avec le frontend.
     */
    private function getAuthData(?User $user): array
    {
        if (! $user) {
            return [
                'user' => null,
                'permissions' => [],
                'permissions_map' => [],
                'roles' => [],
            ];
        }

        // Utilisation du cache utilisateur pour les permissions/rôles
        $cacheKey = "user:{$user->id}:permissions";
        $permissionsData = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($user) {
            $permissions = $user->getAllPermissions()->pluck('name')->toArray();

            return [
                'permissions' => $permissions,
                'permissions_map' => $this->buildPermissionsMap($user),
                'roles' => $user->roles->pluck('name')->toArray(),
            ];
        });

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar_url' => $user->avatar_url,
            ],
            ...$permissionsData,
        ];
    }

    /**
     * Construit une carte des permissions organisée par modèle.
     */
    private function buildPermissionsMap(User $user): array
    {
        static $mapCache = null;
        if ($mapCache !== null) {
            return $mapCache;
        }

        $map = [];
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();
        foreach ($permissions as $permission) {
            if (str_contains($permission, ':')) {
                [$action, $model] = explode(':', $permission, 2);
                $map[$model][$action] = true;
            }
        }
        $mapCache = $map;

        return $map;
    }

    /**
     * Messages flash de la session.
     */
    private function getFlashData(Request $request): array
    {
        return [
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
            'message' => $request->session()->get('message'),
            'warning' => $request->session()->get('warning'),
        ];
    }

    /**
     * Résout l'utilisateur authentifié en gérant les sessions corrompues.
     */
    private function resolveUser(Request $request): ?User
    {
        try {
            return $request->user();
        } catch (QueryException $e) {
            if ($e->getCode() === '22P02') {
                Auth::logout();
                $request->session()->invalidate();

                return null;
            }
            throw $e;
        }
    }
}
