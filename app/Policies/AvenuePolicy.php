<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Avenue;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as AuthUser;

class AvenuePolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole('super_admin') || $user->hasRole('owner')) {
            return true;
        }

        return null;
    }

    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('ViewAny Avenue');
    }

    public function view(AuthUser $authUser, Avenue $avenue): bool
    {
        return $authUser->can('View Avenue');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create Avenue');
    }

    public function update(AuthUser $authUser, Avenue $avenue): bool
    {
        return $authUser->can('Update Avenue');
    }

    public function delete(AuthUser $authUser, Avenue $avenue): bool
    {
        return $authUser->can('Delete Avenue');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny Avenue');
    }

    public function restore(AuthUser $authUser, Avenue $avenue): bool
    {
        return $authUser->can('Restore Avenue');
    }

    public function forceDelete(AuthUser $authUser, Avenue $avenue): bool
    {
        return $authUser->can('ForceDelete Avenue');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny Avenue');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny Avenue');
    }

    public function replicate(AuthUser $authUser, Avenue $avenue): bool
    {
        return $authUser->can('Replicate Avenue');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder Avenue');
    }

}
