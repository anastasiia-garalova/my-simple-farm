<?php

namespace App\Http\Controllers\Teaching;

use App\Enums\Permission;
use App\Enums\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class PermissionDemoController extends Controller
{
    /**
     * Show a teaching page for testing roles and permissions.
     */
    public function show(): Response
    {
        $user = request()->user();

        return Inertia::render('teaching/permissions-demo', [
            'availableRoles' => Role::values(),
            'availablePermissions' => Permission::values(),
            'userRoles' => $user?->getRoleNames()->values()->all() ?? [],
            'userPermissions' => $user?->getPermissionNames()->values()->all() ?? [],
            'demoRoutes' => [
                [
                    'label' => 'Nur Admin-Rolle',
                    'href' => '/teaching/examples/admin',
                    'middleware' => 'role:admin',
                    'purpose' => 'Testet eine reine Rollenprüfung.',
                ],
                [
                    'label' => 'Permission "manage fields"',
                    'href' => '/teaching/examples/fields',
                    'middleware' => 'permission:manage fields',
                    'purpose' => 'Testet eine konkrete Berechtigung.',
                ],
                [
                    'label' => 'Rolle oder Permission',
                    'href' => '/teaching/examples/inventory',
                    'middleware' => 'role_or_permission:admin|manage inventory',
                    'purpose' => 'Testet die kombinierte Middleware.',
                ],
            ],
        ]);
    }

    /**
     * Example route protected by a role.
     */
    public function adminOnly(): JsonResponse
    {
        return response()->json([
            'message' => 'Zugriff erlaubt: Die Middleware role:admin hat den Request durchgelassen.',
            'middleware' => 'role:admin',
        ]);
    }

    /**
     * Example route protected by a permission.
     */
    public function fieldsPermission(): JsonResponse
    {
        return response()->json([
            'message' => 'Zugriff erlaubt: Die Middleware permission:manage fields hat den Request durchgelassen.',
            'middleware' => 'permission:manage fields',
        ]);
    }

    /**
     * Example route protected by a role or permission.
     */
    public function inventoryRoleOrPermission(): JsonResponse
    {
        return response()->json([
            'message' => 'Zugriff erlaubt: Die Middleware role_or_permission:admin|manage inventory hat den Request durchgelassen.',
            'middleware' => 'role_or_permission:admin|manage inventory',
        ]);
    }
}
