<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Commune;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as AuthUser;

class CommunePolicy
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
        return $authUser->can('ViewAny Commune');
    }

    public function view(AuthUser $authUser, Commune $commune): bool
    {
        return $authUser->can('View Commune');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('Create Commune');
    }

    public function update(AuthUser $authUser, Commune $commune): bool
    {
        return $authUser->can('Update Commune');
    }

    public function delete(AuthUser $authUser, Commune $commune): bool
    {
        return $authUser->can('Delete Commune');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('DeleteAny Commune');
    }

    public function restore(AuthUser $authUser, Commune $commune): bool
    {
        return $authUser->can('Restore Commune');
    }

    public function forceDelete(AuthUser $authUser, Commune $commune): bool
    {
        return $authUser->can('ForceDelete Commune');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('ForceDeleteAny Commune');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('RestoreAny Commune');
    }

    public function replicate(AuthUser $authUser, Commune $commune): bool
    {
        return $authUser->can('Replicate Commune');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('Reorder Commune');
    }

}
