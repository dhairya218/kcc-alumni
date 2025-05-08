from django.contrib import admin
from .models import Alumni, Event

@admin.register(Alumni)
class AlumniAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'get_full_name', 'graduation_year', 'course', 'current_company')
    list_filter = ('graduation_year', 'course')
    search_fields = ('user__first_name', 'user__last_name', 'roll_number', 'current_company')
    
    def get_full_name(self, obj):
        return obj.user.get_full_name()
    get_full_name.short_description = 'Name'

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location')
    list_filter = ('date',)
    search_fields = ('title', 'description', 'location')
    filter_horizontal = ('attendees',)